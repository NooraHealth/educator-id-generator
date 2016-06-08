{ Educators } = require "../imports/api/collections/educators.coffee"
{ UniqueID } = require "../imports/api/collections/unique_id.coffee"
#{ Facility } = require "../imports/api/salesforce/Facility.coffee"

Meteor.methods

  "getFacilities": () ->
    result = Salesforce.query "SELECT Id, Name FROM Facility__c"
    return result.response.records

  "insertEducator": (educator) ->
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

  "createEducatorInSalesforce" : ( id )->
    educator = Educators.findOne { _id : id }
    console.log "About to send this contact to Salesforce"
    console.log educator

    result = Salesforce.query "SELECT Id, Name, Delivery_Partner__c FROM Facility__c WHERE Id = '#{educator.facility}'"
    account = result?.response?.records?[0]?.Delivery_Partner__c
    
    callback = Meteor.bindEnvironment ( insertType, err, ret ) ->
      if err
        console.log "Error inserting educator into Salesforce"
        console.log err
        Educators.update { _id: id }, { $push: { errors_inserting_to_salesforce: insertType }}
      else if insertType == "Contact"
        Salesforce.sobject("Facility_Role__c")
        .create {
          "Name" : "Educator Trainee -- #{ educator.first_name } #{ educator.last_name }",
          "Facility__c" : educator.facility,
          "Contact__c" : ret.id,
          "Department__c": educator.department,
          "Role_With_Noora_Program__c": Meteor.settings.FACILITY_ROLE_TYPE,
        }, callback.bind(this, "Facility_Role")
      else
        Educators.update { _id: id }, { $set: { errors_inserting_to_salesforce: [] }}

    #insert into the Salesforce database
    Salesforce.sobject("Contact")
    .create {
      "LastName" : educator.last_name,
      "FirstName" : educator.first_name,
      "MobilePhone" : educator.phone,
      "Department" : educator.department,
      "AccountId" : account,
      "Trainee_Id__c": educator.uniqueId,
      "RecordTypeId": Meteor.settings.CONTACT_RECORD_TYPE,
      "Is_Nurse_Educator_Trainee__c": true,
    }, callback.bind(this, "Contact")

