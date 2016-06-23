{ Educators } = require "../imports/api/collections/educators.coffee"
{ UniqueID } = require "../imports/api/collections/unique_id.coffee"
{ Facilities } = require "../imports/api/collections/facilities.coffee"

Meteor.methods

  "updateFacilitiesInMongo": ->
    facilities = Meteor.call("getFacilitiesFromSalesforce")
    console.log facilities
    for facility in facilities
      if not Facilities.findOne { salesforce_id: facility.Id }
        Facilities.insert { name: facility.Name, salesforce_id: facility.Id, delivery_partner: facility.Delivery_Partner__c }

  "getFacilitiesFromSalesforce": () ->
    result = Salesforce.query "SELECT Id, Name, Delivery_Partner__c FROM Facility__c"
    return result.response.records

  "insertEducator": (educator) ->
    console.log "about to insert this educator"
    console.log educator
    return Educators.insert educator

  "getUniqueId": ->
    result = UniqueID.findAndModify({
      query: { _id: Meteor.settings.UNIQUE_ID_DOC_ID }
      update: { $inc: { currentUniqueID: 1 } }
    }, (error, result)->
      console.log "This is the result"
      console.log result
    )
    return result.currentUniqueID

  "createFacilityRolesInSalesforce": ( educators )->
    console.log("Creating facilityRoles in SAlesforce")
    console.log educators
    mapped = educators.map( (educator) ->
      return {
        "Name" : "Educator Trainee -- #{ educator.first_name } #{ educator.last_name }",
        "Facility__c" : educator.facility_salesforce_id,
        "Contact__c" : educator.contact_salesforce_id,
        "Department__c": educator.department,
        "Role_With_Noora_Program__c": Meteor.settings.FACILITY_ROLE_TYPE,
      }
    )

    callback = Meteor.bindEnvironment ( err, ret ) ->
      if err
        console.log "Error inserting facility role into Salesforce"
        console.log err
      else
        console.log("Inserted facility role successfully")
        console.log("The resturn", ret)
        for inserted, i in ret
          console.log(" about to update")
          console.log(inserted)
          console.log i
          educator = educators[i]
          Educators.update { _id: educator._id }, { $set: { facility_role_salesforce_id: inserted.id }}

    #insert into the Salesforce database
    Salesforce.sobject("Facility_Role__c").create mapped, callback.bind(this)

  "createContactsInSalesforce": ( educators )->
    mapped = educators.map( (educator) ->
      facility = Facilities.findOne { salesforce_id: educator.facility_salesforce_id }
      lastName = educator.last_name
      firstName = educator.first_name
      if not lastName or lastName is ""
        lastName = educator.first_name
        firstName = ""
    
      return {
        "LastName" : lastName,
        "FirstName" : firstName,
        "MobilePhone" : educator.phone,
        "Department" : educator.department,
        "AccountId" : facility.delivery_partner,
        "Trainee_Id__c": educator.uniqueId,
        "RecordTypeId": Meteor.settings.CONTACT_RECORD_TYPE,
        "Is_Nurse_Educator_Trainee__c": true,
      }
    )

    callback = Meteor.bindEnvironment ( err, ret ) ->
      if err
        console.log "Error inserting into Salesforce"
        console.log err
      else
        console.log("Inserted successfully")
        console.log("The resturn", ret)
        for inserted, i in ret
          educator = educators[i]
          Educators.update { _id: educator._id }, { $set: { contact_salesforce_id: inserted.id }}

    #insert into the Salesforce database
    Salesforce.sobject("Contact").create mapped, callback.bind(this)
