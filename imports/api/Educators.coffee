
Immutable = require 'immutable'

BaseEducator = Immutable.Record {
  first_name: '',
  last_name: 'Richards',
  phone: '',
  department: '',
  facility_name: '',
  condition_operations: Immutable.List(),
  uniqueId: null,
  loading: false
}

class Educator extends BaseEducator
  constructor: ( properties )->
    super Object.assign({}, properties, {
      condition_operations: Immutable.List properties && properties.condition_operations
    });

  setUniqueId: ->
    return new Promise ( resolve, reject )->
      if educator.uniqueId
        resolve educator.uniqueId
      else
        Meteor.call "getUniqueId", educator.facility_name, (error, uniqueId)->
          if error
            reject "Error retrieving unique id #{error}"
          else
            educator.set { "uniqueId": uniqueId }
            resolve uniqueId

  save: ->
    educator = this
    return new Promise ( resolve, reject )->
      educator.setUniqueId()
      .then( ( id )->
        educator.set { "needs_update": true }
        Meteor.call "educator.upsert", educator.uniqueId, educator.toJS(), ( error, results )->
          if error then reject error else resolve results
      , ( error )->
        reject error
      )

Meteor.methods
  "educator.upsert": ( uniqueId, educator )->
    console.log educator
    facility = Facilities.findOne { name: educator.facility_name }
    educator.facility_salesforce_id = facility.salesforce_id
    EducatorsSchema.clean(educator)
    EducatorsSchema.validate(educator);
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
