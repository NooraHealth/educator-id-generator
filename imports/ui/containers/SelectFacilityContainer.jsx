
import { createContainer } from 'meteor/react-meteor-data';
import { SearchableList } from '../components/searchable_list/List.jsx';
import { Facilities } from '../../api/collections/facilities.coffee';

export default SelectFacilityContainer = createContainer(() => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handle = Meteor.subscribe("facilities.all");

  this._onSelect = function( id, name ){
    Session.set("current_facility_id", id);
    Session.set("current_facility_name", name);
    FlowRouter.go("/");
  };

  this._getItems = function( facilities ) {
    console.log("The facilities I am putting here");
    console.log(facilities);
    console.log("Facilities fetich");
    console.log(Facilities.find().fetch());

    return facilities.map( function( facility ){
      return {
        value: facility.salesforce_id,
        key: facility._id,
        title: facility.name
      }
    });
  };

  return {
    loading: ! handle.ready(),
    items: _getItems( Facilities.find({}).fetch() ),
    searchBarPlaceholder: " Search Facilities",
    onSelect: this._onSelect,
  };
}, SearchableList);

export { SelectFacilityContainer };
