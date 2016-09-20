
{ Facilities } = require '../imports/api/collections/facilities.coffee'

Meteor.publish "facilities.all",() ->
  console.log "Publishing all the facilities"
  console.log Facilities.find()
  return Facilities.find({})
