
Immutable = require 'immutable'
{ UniqueID } = require './collections/unique_id.coffee'
{ Educators } = require './collections/educators.coffee'
{ EducatorsSchema } = require './collections/educators.coffee'
{ Facilities } = require './collections/facilities.coffee'

BaseEducator = Immutable.Record {
  first_name: '',
  last_name: '',
  phone: '',
  department: '',
  facility_name: '',
  salesforce_id: '',
  salesforce_id: '',
  facility_salesforce_id: '',
  facility_role_salesforce_id: '',
  needs_update: false,
  condition_operations: Immutable.List(),
  uniqueId: null,
  loading: false
}

class Educator extends BaseEducator
  constructor: ( properties )->
    super Object.assign({}, properties, {
      condition_operations: Immutable.List properties && properties.condition_operations
    });

  getUniqueId: ->
    educator = this
    return new Promise ( resolve, reject )->
      if educator.uniqueId
        resolve educator.uniqueId
      else
        console.log "Getting the unique id of "
        console.log educator
        Meteor.call "getUniqueId", educator.facility_name, (error, uniqueId)->
          if error
            reject "Error retrieving unique id #{error}"
          else
            resolve uniqueId

  save: ->
    educator = this
    return new Promise ( resolve, reject )->
      educator.getUniqueId()
      .then( ( id )->
        educator = educator.set "needs_update", true
        educator = educator.set "uniqueId", id
        Meteor.call "educator.upsert", educator.uniqueId, educator.toJS(), ( error, results )->
          console.log "upserted "
          console.log results
          console.log error
          if error then reject error else resolve educator
      , ( error )->
        reject error
      )

if Meteor.isServer
  Meteor.methods
    "educator.upsert": ( uniqueId, educator )->
      facility = Facilities.findOne { name: educator.facility_name }
      educator.facility_salesforce_id = facility.salesforce_id
      EducatorsSchema.clean(educator)
      EducatorsSchema.validate(educator);
      console.log "Saving this educator "
      console.log educator
      return Educators.upsert { uniqueId: educator.uniqueId }, { $set: educator }

    "getUniqueId": ( facilityName )->
      generateUniqueId = ( facilityName )->
          result = UniqueID.findOne({_id: Meteor.settings.UNIQUE_ID_DOC_ID})
          UniqueID.update { _id: Meteor.settings.UNIQUE_ID_DOC_ID }, { $inc:{ currentUniqueID: 1 }}

          getInitials = ( name )->
            words = name.split " "
            letters = words.map (word)->
              cleaned = word.replace(/[^a-zA-Z]/g, "")
              return cleaned[0]?.toUpperCase()

          initials = getInitials( facilityName )
          return initials.join("") + result.currentUniqueID

      return generateUniqueId facilityName

module.exports.Educator = Educator
