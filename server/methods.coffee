{ Educators } = require "../imports/api/collections/educators.coffee"
{ Facilities } = require "../imports/api/collections/facilities.coffee"
{ UniqueID } = require "../imports/api/collections/unique_id.coffee"
{ generateUniqueId } = require "./uniqueIdGen.coffee"

Meteor.methods

  "insertEducator": ( educator )->
    facility = Facilities.findOne { name: educator.facility_name }
    educator.facility_salesforce_id = facility.salesforce_id
    return Educators.insert educator

  "updateEducator": ( uniqueId, fields )->
    Educators.update { uniqueId: uniqueId }, { $set: fields }

  "getUniqueId": ( facilityName )->
    console.log "Getting a unique Id"
    return generateUniqueId facilityName
