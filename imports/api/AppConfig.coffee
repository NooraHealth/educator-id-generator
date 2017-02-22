
{ Facilities } = require './collections/facilities.coffee'

class AppConfig
  @get: ->
    @privateApp ?= new PrivateClass()
    return @privateApp

  class PrivateClass
    constructor: ->

    setFacilityName: ( name )->
      Session.set "current_facility_name", name

    getFacilityName: ->
      name = Session.get "current_facility_name"
      if name == undefined
        @setFacilityName ""
      Session.get "current_facility_name"

    getFacilityId: ->
      console.log "Getting the facility name"
      name = this.getFacilityName()
      console.log "NAME #{name}"
      facility = Facilities.findOne({ name: name });
      console.log facility?.salesforce_id
      return facility?.salesforce_id

module.exports.AppConfig = AppConfig.get()
