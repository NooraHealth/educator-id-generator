
###
# Educator
###

Educators = new Mongo.Collection Meteor.settings.public.educators_collection

EducatorsSchema = new SimpleSchema
  last_name:
    type:String
    optional: true
  first_name:
    type:String
  department:
    type:String
  facility:
    type:String
  phone:
    type: Number
  errors_inserting_to_salesforce:
    type: [String]
    optional: true
  uniqueId:
    type: Number
    optional: true
    label: "Unique Id"

Educators.attachSchema EducatorsSchema

module.exports.Educators = Educators
module.exports.EducatorsSchema = EducatorsSchema
