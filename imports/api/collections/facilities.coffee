
###
# Facilities
###

Facilities = new Mongo.Collection Meteor.settings.public.facilities_collection

FacilitiesSchema = new SimpleSchema
  name:
    type:String
  salesforce_id:
    type:String

Facilities.attachSchema FacilitiesSchema

module.exports.Facilities = Facilities
