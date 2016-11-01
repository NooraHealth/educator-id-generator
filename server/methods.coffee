{ Educators } = require "../imports/api/collections/educators.coffee"
{ BackupEducators } = require "../imports/api/collections/educators.coffee"
{ UniqueID } = require "../imports/api/collections/unique_id.coffee"
{ generateUniqueId } = require "./uniqueIdGen.coffee"

Meteor.methods

  "insertEducator": ( educator )->
    BackupEducators.insert educator
    return Educators.insert educator

  "getUniqueId": ( facilityName )->
    return generateUniqueId facilityName
