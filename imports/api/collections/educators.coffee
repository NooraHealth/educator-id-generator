
###
# Educator
###

Educators = new Mongo.Collection Meteor.settings.public.educators_collection

EducatorsSchema = new SimpleSchema
  name:
    type:String
    label: "Name"
  uniqueId:
    type: Number
    label: "Unique Id"
  date_added:
    type: String
    max: 20

Educators.attachSchema EducatorsSchema

module.exports.Educators = Educators
