{ Educators } = require "../imports/api/collections/educators.coffee"
{ BackupEducators } = require "../imports/api/collections/educators.coffee"
{ UniqueID } = require "../imports/api/collections/unique_id.coffee"
{ Facilities } = require "../imports/api/collections/facilities.coffee"
{ isInt } = require "./utils"

Meteor.methods

  "importFacilities": ->
    facilities = Meteor.call("fetchFacilitiesFromSalesforce");
    for facility in facilities
      if not Facilities.findOne { salesforce_id: facility.Id }
        Facilities.insert { name: facility.Name, salesforce_id: facility.Id, delivery_partner: facility.Delivery_Partner__c }

  "importEducators": ->
    records = Meteor.call("fetchEducatorsFromSalesforce")
    for record in records
      educator = record.Contact__r
      facility = record.Facility__r
      if not Educators.findOne { uniqueId: educator.Trainee_ID__c }
        phone = if isInt( educator.MobilePhone ) then parseInt(educator.MobilePhone) else null
        Educators.insert {
          last_name: educator.LastName or ""
          first_name: educator.FirstName or ""
          contact_salesforce_id: educator.Id
          department: educator.Department or ""
          salesforce_facility_id: facility.Id
          facility_role_salesforce_id: record.Id
          facility_salesforce_id: facility.Id
          facility_name: facility.Name
          phone: phone or 0
          uniqueId: educator.Trainee_ID__c
        }

  "fetchFacilitiesFromSalesforce": ->
    result = Salesforce.query "SELECT Id, Name, Delivery_Partner__c FROM Facility__c"
    return result?.response?.records

  "fetchEducatorsFromSalesforce": ->
    # result = Salesforce.query "SELECT Id, FirstName, LastName, MobilePhone, Department, Trainee_Id__c FROM Contact WHERE Trainee_Id__c != ''"
    result = Salesforce.query "SELECT Id, Contact__c, Contact__r.id,
      Contact__r.MobilePhone, Contact__r.FirstName, Contact__r.LastName, Contact__r.Department,
      Contact__r.Trainee_Id__c, Facility__c, Facility__r.Name, Facility__r.id
      FROM Facility_Role__c WHERE Role_With_Noora_Program__c = 'Trainee'"
    return result?.response?.records

  "insertEducator": ( educator )->
    BackupEducators.insert educator
    return Educators.insert educator

  "getUniqueId": ( facilityName )->
    result = UniqueID.findAndModify({
      query: { _id: Meteor.settings.UNIQUE_ID_DOC_ID }
      update: { $inc: { currentUniqueID: 1 } }
    }, (error, result)->
      console.log "This is the result"
      console.log result
    )

    getInitials = ( name )->
      words = name.split " "
      letters = words.map (word)->
        cleaned = word.replace(/[^a-zA-Z]/g, "")
        return cleaned[0]?.toUpperCase()
    initials = getInitials( facilityName )
    return initials.join("") + result.currentUniqueID

  "exportFacilityRoles": ( educators )->
    mapped = educators.map( (educator) ->
      return {
        educator: educator
        salesforce_role: {
          "Name" : "Educator Trainee -- #{ educator.first_name } #{ educator.last_name }",
          "Facility__c" : educator.facility_salesforce_id,
          "Contact__c" : educator.contact_salesforce_id,
          "Department__c": educator.department,
          "Role_With_Noora_Program__c": Meteor.settings.FACILITY_ROLE_TYPE,
        }
      }
    )

    callback = Meteor.bindEnvironment ( educator, err, ret ) ->
      if err
        console.log "Error inserting facility role into Salesforce"
        console.log err
      else
        Educators.update { _id: educator._id }, { $set: { facility_role_salesforce_id: ret.id }}

    #insert into the Salesforce database
    for role in mapped
      Salesforce.sobject("Facility_Role__c").create role.salesforce_role, callback.bind(this, role.educator)

  "exportNurseEducators": ( educators )->
    mapped = educators.map( (educator) ->
      facility = Facilities.findOne {
        salesforce_id: educator.facility_salesforce_id
      }
      lastName = educator.last_name
      firstName = educator.first_name
      if not lastName or lastName is ""
        lastName = educator.first_name
        firstName = ""

      return {
        educator: educator
        salesforce_contact: {
          "LastName" : lastName,
          "FirstName" : firstName,
          "MobilePhone" : educator.phone,
          "Department" : educator.department,
          "AccountId" : facility.delivery_partner,
          "Trainee_Id__c": educator.uniqueId,
          "RecordTypeId": Meteor.settings.CONTACT_RECORD_TYPE
        }
      }
    )

    callback = Meteor.bindEnvironment ( educator, err, ret ) ->
      if err
        console.log err
      else
        Educators.update { _id: educator._id }, { $set: { contact_salesforce_id: ret.id }}

    #insert into the Salesforce database
    for educator in mapped
      Salesforce.sobject("Contact").create educator.salesforce_contact, callback.bind(this, educator.educator)
