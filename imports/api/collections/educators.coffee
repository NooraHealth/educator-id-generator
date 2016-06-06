
###
# Educator
###

Educators = new Mongo.Collection Meteor.settings.public.educators_collection

Ground.Collection Educators

EducatorsSchema = new SimpleSchema
  name:
    type:String
    label: "Name"
  date_added:
    type: String
    max: 20

Educators.attachSchema EducatorsSchema

module.exports.Educators = Educators
