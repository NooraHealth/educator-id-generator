{ Educators } = require "../imports/api/collections/educators.coffee"
{ BackupEducators } = require "../imports/api/collections/educators.coffee"
{ UniqueID } = require "../imports/api/collections/unique_id.coffee"
{ Facilities } = require "../imports/api/collections/facilities.coffee"
{ isInt } = require "./utils"

Meteor.methods

  "updateFacilitiesInMongo": ->
    facilities = Meteor.call("getFacilitiesFromSalesforce")
    console.log facilities
    for facility in facilities
      if not Facilities.findOne { salesforce_id: facility.Id }
        Facilities.insert { name: facility.Name, salesforce_id: facility.Id, delivery_partner: facility.Delivery_Partner__c }

  "updateEducatorsInMongo": ->
    educators = Meteor.call("getEducatorsFromSalesforce")
    console.log "The educators!!"
    for educator in educators
      if not Educators.findOne { uniqueId: educator.Trainee_ID__c }
        phone = if isInt( educator.MobilePhone ) then parseInt(educator.MobilePhone) else null
        console.log "About to insert this"
        console.log educator
        Educators.insert {
          last_name: educator.LastName or ""
          first_name: educator.FirstName or ""
          contact_salesforce_id: educator.Id
          department: educator.Department or ""
          phone: phone or 0
          uniqueId: educator.Trainee_ID__c
        }

  "getFacilitiesFromSalesforce": ->
    result = Salesforce.query "SELECT Id, Name, Delivery_Partner__c FROM Facility__c"
    return result?.response?.records

  "getEducatorsFromSalesforce": ->
    result = Salesforce.query "SELECT Id, FirstName, LastName, MobilePhone, Department, Trainee_Id__c FROM Contact WHERE Trainee_Id__c != ''"
    return result?.response?.records

  "insertEducator": ( educator )->
    BackupEducators.insert educator
    return Educators.insert educator

  "getUniqueId": ( facilityName )->
    result = UniqueID.findAndModify({
      query: { _id: Meteor.settings.UNIQUE_ID_DOC_ID }
      update: { $inc: { currentUniqueID: 1 } }
    }, (error, result)->
      console.log "This is the result"
      console.log result
    )

    console.log facilityName
    getInitials = ( name )->
      words = name.split " "
      letters = words.map (word)->
        cleaned = word.replace(/[^a-zA-Z]/g, "")
        return cleaned[0]?.toUpperCase()
    initials = getInitials( facilityName )
    return initials.join("") + result.currentUniqueID

  "createFacilityRolesInSalesforce": ( educators )->
    console.log "Creating facility roles for"
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
        if not Array.isArray ret then ret = [ret]
        console.log("The second ret (should be array) ", ret)
        for inserted, i in ret
          educator = educators[i]
          Educators.update { _id: educator._id }, { $set: { facility_role_salesforce_id: inserted.id }}

    #insert into the Salesforce database
    for facility in mapped
      Salesforce.sobject("Facility_Role__c").create facility, callback.bind(this)

  "createContactsInSalesforce": ( educators )->
    console.log "Creating Contacts in Salesforce"
    console.log educators
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
        "RecordTypeId": Meteor.settings.CONTACT_RECORD_TYPE
      }
    )

    callback = Meteor.bindEnvironment ( err, ret ) ->
      if err
        console.log "Error inserting into Salesforce"
        console.log err
      else
        console.log("Inserted successfully")
        console.log("The resturn", ret)
        if not Array.isArray ret then ret = [ret]
        console.log "This is now ret ", ret
        for inserted, i in ret
          educator = educators[i]
          Educators.update { _id: educator._id }, { $set: { contact_salesforce_id: inserted.id }}

    #insert into the Salesforce database
    for educator in mapped
      Salesforce.sobject("Contact").create educator, callback.bind(this)
