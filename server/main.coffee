
{ Educators } = require '../imports/api/collections/educators.coffee';
{ Educators } = require '../imports/api/Educators.coffee';
{ ConditionOperations } = require '../imports/api/collections/condition_operations.coffee';
{ Facilities } = require '../imports/api/collections/facilities.coffee';

Meteor.startup ()->
  # Educators.remove {first_name: "Lucy"}
