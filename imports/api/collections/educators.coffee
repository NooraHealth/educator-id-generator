
###
# Educator
###

Educators = new Mongo.Collection Meteor.settings.public.educators_collection

EducatorsSchema = new SimpleSchema
  last_name:
    type: String
    defaultValue: ""
  first_name:
    type: String
    defaultValue: ""
  department:
    type: String
    defaultValue: ""
  facility_salesforce_id:
    type: String
    defaultValue: ""
  facility_role_salesforce_id:
    type: String
    defaultValue: ""
  contact_salesforce_id:
    type: String
    defaultValue: ""
  facility_name:
    type: String
    defaultValue: ""
  phone:
    type: Number
    defaultValue: ""
  uniqueId:
    type: String
    label: "Unique Id"
    optional: true

Educators.attachSchema EducatorsSchema

module.exports.Educators = Educators
module.exports.EducatorsSchema = EducatorsSchema
