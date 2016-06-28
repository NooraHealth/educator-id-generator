
###
# Educator
###

Educators = new Mongo.Collection Meteor.settings.public.educators_collection

EducatorsSchema = new SimpleSchema
  last_name:
    type: String
    optional: true
  first_name:
    type: String
  department:
    type: String
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
  phone:
    type: Number
  uniqueId:
    type: String
    optional: true
    label: "Unique Id"

Educators.attachSchema EducatorsSchema

module.exports.Educators = Educators
module.exports.EducatorsSchema = EducatorsSchema
