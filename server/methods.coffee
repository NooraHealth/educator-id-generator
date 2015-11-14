Meteor.methods
  "sendToSalesforce" : ( id )->

    callback = Meteor.bindEnvironment ( err, ret ) ->
      if err
        console.log "Error inserting patient into Salesforce"
      else
        console.log "Success inserting into salesforce"
        console.log ret
        console.log "setting the salesforce_id"
        doc = Patients.update { _id: id } , { $set: { salesforce_id: ret.id } }
        console.log Patients.findOne { _id: doc }

    patient = Patients.findOne { _id : id }
    #insert into the Salesforce database
    Salesforce.sobject("Patient__c")
    .create {
      "Name" : patient.phone,
      "Language__c" : patient.language,
      "Discharged__c" : patient.discharged,
      "Took_Class__c" : patient.took_first_class,
      "took_practical__c" : patient.took_practical,
      "Subscribed_to_IVR__c": patient.subscribes_to_ivr,
      "Hospital__c" : patient.hospital,
      "Date_first_class__c": patient.date_first_class,
      "Date_took_practical__c" : patient.date_took_practical,
      "Date_added__c" : patient.date_added,
      "Added_to_IVR__c" : patient.has_been_input_to_ivr_system,
      "test" : patient.is_test
    }, callback

  "updatePatient": ( query )->
    Salesforce.sobject "Patient__c"
      .update query, ( err, ret )->
        if err
          console.log "Error updating document", err
        else
          console.log "Patient updated!"




