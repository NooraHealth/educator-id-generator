
Immutable = require 'immutable'
{ UniqueID } = require './collections/unique_id.coffee'
{ Educators } = require './collections/educators.coffee'
{ EducatorsSchema } = require './collections/educators.coffee'
{ Facilities } = require './collections/facilities.coffee'

BaseEducator = Immutable.Record {
  first_name: '',
  last_name: '',
  phone: 0,
  department: '',
  facility_name: '',
  contact_salesforce_id: '',
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

  save: ->
    educator = this.toJS()
    return new Promise ( resolve, reject )->
      functionCall = if educator.uniqueId then "educator.update" else "educator.insert"

      try
        EducatorsSchema.clean(educator)
        EducatorsSchema.validate(educator)
      catch error
        console.log "ERROR validating the educator"
        console.log educator
        reject( error )
        return

      console.log educator
      console.log "Getting the function call: " + functionCall
      Meteor.call functionCall, educator, ( error, results )->
        if error
          reject error
        else
          console.log "The results!!"
          console.log results
          resolve results

if Meteor.isServer
  { SalesforceInterface } = require './salesforce/SalesforceInterface.coffee'

  Meteor.methods
    "educator.insert": ( educator ) ->
      console.log "Going to insert the educator"
      toSalesforce = new SalesforceInterface()
      promise = Promise.resolve(Meteor.call "getUniqueId", educator)
      return promise.then(( uniqueId )->
        educator.uniqueId = uniqueId
        console.log "This is the uniqueId"
        console.log uniqueId
        return toSalesforce.upsertEducator(educator)
      ).then(( salesforceId )->
        console.log salesforceId
        educator.contact_salesforce_id = salesforceId
        console.log "About to insert into Mongodb"
        console.log educator
        return Promise.resolve Educators.insert educator
      ).then( (id)->
        educator = Educators.findOne { _id: id }
        return toSalesforce.exportFacilityRole educator, false
      ).then(( facilityRoleSalesforceId )->
        educator.facility_role_salesforce_id = facilityRoleSalesforceId
        return toSalesforce.exportConditionOperationRoles educator
      ).then((condition_operations)->
        educator.condition_operations = condition_operations
        educator.export_error = false
        return Promise.resolve Educators.update { uniqueId: educator.uniqueId }, {$set: educator }
      ).then( ->
        console.log "Educator fully inserted and synced"
        return educator
      ,(err) ->
        console.log "error exporting educators"
        console.log err
        Educators.update { uniqueId: educator.uniqueId }, {$set: { export_error: true }}
        throw err
      )

    "educator.update": ( educator ) ->
      console.log "Going to update educator "
      toSalesforce = new SalesforceInterface()
      promise = toSalesforce.upsertEducator(educator)
      promise.then( ->
      #   educator.contact_salesforce_id = salesforceId
      #   console.log "contact updated"
      #   return Promise.resolve Educators.update { uniqueId: educator.uniqueId }, {$set: educator }
      # ).then( ->
        return toSalesforce.updateFacilityRole educator
      ).then(( facilityRoleSalesforceId )->
        educator.facility_role_salesforce_id = facilityRoleSalesforceId
        console.log "facility role updated"
        console.log facilityRoleSalesforceId
        return toSalesforce.deleteConditionOperationRoles educator.condition_operations
      ).then( ()->
        console.log "deleted the condition operations"
        return toSalesforce.exportConditionOperationRoles educator
      ).then((condition_operations)->
        educator.condition_operations = condition_operations
        educator.update_error = false
        return Promise.resolve Educators.update { uniqueId: educator.uniqueId }, {$set: educator }
      ).then( ()->
        console.log "Educator fully updated and synced with salesforce"
        return educator
      ,(err) ->
        console.log "error upserting educators"
        console.log err
        Educators.update { uniqueId: educator.uniqueId }, {$set: { update_error: true }}
        throw err
      )

    "getUniqueId": ( educator )->
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

      return generateUniqueId educator.facility_name

module.exports.Educator = Educator
