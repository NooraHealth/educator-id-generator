
{ Educators } = require '../imports/api/collections/educators.coffee';
{ ConditionOperations } = require '../imports/api/collections/condition_operations.coffee';
{ Facilities } = require '../imports/api/collections/facilities.coffee';

Meteor.startup ()->
  # Educators.remove {first_name: "Lucy"}
  console.log ConditionOperations.find({}).fetch()
