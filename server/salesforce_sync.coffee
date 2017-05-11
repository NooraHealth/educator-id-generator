{ SalesforceInterface } = require '../imports/api/salesforce/SalesforceInterface.coffee'

Meteor.methods
  "syncFacilities": ->
    salesforceInterface = new SalesforceInterface()
    salesforceInterface.importFacilities()

  "syncConditionOperations": ->
    salesforceInterface = new SalesforceInterface()
    salesforceInterface.importConditionOperations()

  "syncEducators": ->
    salesforceInterface = new SalesforceInterface()
    salesforceInterface.importEducators()

  "syncAttendance": ->
    salesforceInterface = new SalesforceInterface()
    salesforceInterface.importAttendance()

  "syncClassEducators": ->
    salesforceInterface = new SalesforceInterface()
    salesforceInterface.importClassEducatorRoles()
