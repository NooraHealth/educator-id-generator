
###
# Educator
###

Educators = new Mongo.Collection Meteor.settings.public.educators_collection

EducatorsSchema = new SimpleSchema
  last_name:
    type:String
  first_name:
    type:String
  department:
    type:String
  phone:
    type: Number
  uniqueId:
    type: Number
    label: "Unique Id"

Educators.attachSchema EducatorsSchema

module.exports.Educators = Educators
