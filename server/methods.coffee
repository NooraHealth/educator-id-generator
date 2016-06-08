{ Educators } = require "../imports/api/collections/educators.coffee"
{ UniqueID } = require "../imports/api/collections/unique_id.coffee"
#{ Facility } = require "../imports/api/salesforce/Facility.coffee"

Meteor.methods

  "getFacilities": () ->
    console.log "About to fin facilities"
    result = Salesforce.query "SELECT Id, Name FROM Facility__c"
    console.log result
    return result.response.records

  "insertEducator": (educator) ->
    console.log "About to insert this educator"
    console.log educator
    #syncInsert = Meteor.wrapAsync Educators.insert
    #result = syncInsert educator
    return Educators.insert educator

  "getUniqueId": ->
    result = UniqueID.findAndModify({
      query: { _id: Meteor.settings.UNIQUE_ID_DOC_ID }
      update: { $inc: { currentUniqueID: 1 } }
    }, (error, result)->
      console.log "This is the result"
      console.log result
    )
    console.log "This is the result outside"
    console.log result.currentUniqueID
    return result.currentUniqueID
    #incrementAndRetrieveUniqueId = Meteor.wrapAsync( UniqueID.findAndModify )
    #result = incrementAndRetrieveUniqueId({
      #query: {_id: Meteor.settings.UNIQUE_ID_DOC_ID}
      #update: { $inc: { currentId: 1  }}
    #})
    #console.log "The result from wrap async"
    #console.log result
    #return result.currentUniqueID

    #Meteor.call "sendToSalesforce", id
    
  "createEducatorInSalesforce" : ( id )->

    callback = Meteor.bindEnvironment ( err, ret ) ->
      if err
        console.log "Error inserting educator into Salesforce"
        console.log err
      else
        console.log "Success inserting into salesforce"
        console.log ret
        Salesforce.sobject("Facility_Role__c")
        .create {
          "Name" : "Educator Trainee -- #{ educator.first_name } #{ educator.last_name }",
          "Facility__c" : educator.facility,
          "Contact__c" : ret.id,
          "Department__c": educator.department,
          "Role_With_Noora_Program__c": Meteor.settings.FACILITY_ROLE_TYPE,
        }

    educator = Educators.findOne { _id : id }
    result = Salesforce.query "SELECT Id, Name, Delivery_Partner__c FROM Facility__c WHERE Id = '#{educator.facility}'"
    account = result?.response?.records?[0]?.Delivery_Partner__c
    console.log account
    
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
    }, callback

