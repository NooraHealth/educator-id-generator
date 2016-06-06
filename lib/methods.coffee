Meteor.methods

  "insertEducator": ( educator )->
    id = Patients.insert educator
    #Meteor.call "sendToSalesforce", id

