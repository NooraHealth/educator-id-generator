
{ Educators } = require '../imports/api/collections/educators.coffee';
{ ConditionOperations } = require '../imports/api/collections/condition_operations.coffee';
{ Facilities } = require '../imports/api/collections/facilities.coffee';
{ Classes } = require '../imports/api/collections/classes.coffee';
require '../imports/api/Educators.coffee';
require './salesforce_sync.coffee'

Meteor.startup ()->

  # Classes.remove({})
  # console.log Classes.find({}).fetch().length
