
{ Facilities } = require '../imports/api/collections/facilities.coffee'

Meteor.publish "facilities.all",() ->
  return Facilities.find({})
