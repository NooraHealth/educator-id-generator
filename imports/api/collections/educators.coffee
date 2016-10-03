
###
# Educator
###

Educators = new Mongo.Collection Meteor.settings.public.educators_collection
BackupEducators = new Mongo.Collection "backup_educators"

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
BackupEducators.attachSchema EducatorsSchema

module.exports.Educators = Educators
module.exports.BackupEducators = BackupEducators
module.exports.EducatorsSchema = EducatorsSchema
