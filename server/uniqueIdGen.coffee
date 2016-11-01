
{ UniqueID } = require "../imports/api/collections/unique_id.coffee"

generateUniqueId = ( facilityName )->
    result = UniqueID.findAndModify({
      query: { _id: Meteor.settings.UNIQUE_ID_DOC_ID }
      update: { $inc: { currentUniqueID: 1 } }
    }, (error, result)->
      console.log "This is the result"
      console.log result
    )

    getInitials = ( name )->
      words = name.split " "
      letters = words.map (word)->
        cleaned = word.replace(/[^a-zA-Z]/g, "")
        return cleaned[0]?.toUpperCase()
        
    initials = getInitials( facilityName )
    return initials.join("") + result.currentUniqueID


module.exports.generateUniqueId = generateUniqueId
