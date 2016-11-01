{ Educators } = require "../imports/api/collections/educators.coffee"
{ BackupEducators } = require "../imports/api/collections/educators.coffee"
{ UniqueID } = require "../imports/api/collections/unique_id.coffee"
{ Facilities } = require "../imports/api/collections/facilities.coffee"
{ generateUniqueId } = require "./uniqueIdGen.coffee"
{ isInt } = require "./utils"

Meteor.methods

  "insertEducator": ( educator )->
    BackupEducators.insert educator
    return Educators.insert educator

  "getUniqueId": ( facilityName )->
    return generateUniqueId facilityName
    # result = UniqueID.findAndModify({
    #   query: { _id: Meteor.settings.UNIQUE_ID_DOC_ID }
    #   update: { $inc: { currentUniqueID: 1 } }
    # }, (error, result)->
    #   console.log "This is the result"
    #   console.log result
    # )
    #
    # console.log facilityName
    # getInitials = ( name )->
    #   words = name.split " "
    #   letters = words.map (word)->
    #     cleaned = word.replace(/[^a-zA-Z]/g, "")
    #     return cleaned[0]?.toUpperCase()
    # initials = getInitials( facilityName )
    # return initials.join("") + result.currentUniqueID
