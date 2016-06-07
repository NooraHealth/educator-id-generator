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
    Educators.insert educator

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
    
  "sendToSalesforce" : ( id )->

    #callback = Meteor.bindEnvironment ( err, ret ) ->
      #if err
        #console.log "Error inserting patient into Salesforce"
        #console.log err
      #else
        #console.log "Success inserting into salesforce"
        #console.log ret
        #console.log "setting the salesforce_id"
        #Patients.update { _id: id } , { $set: { salesforce_id: ret.id } }
        #console.log Patients.findOne { _id: id }

    #patient = Patients.findOne { _id : id }
    ##insert into the Salesforce database
    #Salesforce.sobject("Patient__c")
    #.create {
      #"Name" : patient.phone,
      #"Language__c" : patient.language,
      #"Subscribed_to_IVR__c": patient.subscribes_to_ivr,
      #"Hospital__c" : patient.hospital,
      #"Date_first_class__c": patient.date_first_class,
      #"Date_took_practical__c" : patient.date_took_practical,
      #"Date_added__c" : patient.date_added,
      #"Added_to_IVR__c" : patient.has_been_input_to_ivr_system,
      #"test" : patient.is_test
    #}, callback

