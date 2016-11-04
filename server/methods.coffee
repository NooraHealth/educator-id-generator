{ Educators } = require "../imports/api/collections/educators.coffee"
{ EducatorsSchema } = require "../imports/api/collections/educators.coffee"
{ Facilities } = require "../imports/api/collections/facilities.coffee"
{ UniqueID } = require "../imports/api/collections/unique_id.coffee"
{ generateUniqueId } = require "./uniqueIdGen.coffee"

Meteor.methods

  "insertEducator": ( educator )->
    facility = Facilities.findOne { name: educator.facility_name }
    educator.facility_salesforce_id = facility.salesforce_id
    EducatorsSchema.clean(educator)
    return Educators.insert educator

  "updateEducator": ( educator )->
    educator.needs_update = true
    facility = Facilities.findOne { name: educator.facility_name }
    educator.facility_salesforce_id = facility.salesforce_id
    Educators.update { uniqueId: educator.uniqueId }, { $set: educator }
    console.log "updated educator"
    console.log Educators.findOne {uniqueId: educator.uniqueId}

  "getUniqueId": ( facilityName )->
    console.log "Getting a unique Id"
    return generateUniqueId facilityName
