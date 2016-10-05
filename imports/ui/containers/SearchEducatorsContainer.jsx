import { createContainer } from 'meteor/react-meteor-data';
import { SearchableList } from '../components/searchable_list/List.jsx';
import { Educators } from '../../api/collections/educators.coffee';

export default SearchEducatorsContainer = createContainer(( params ) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

  const { currentFacilityId, currentFacilityName } = params;

  var handle = Meteor.subscribe("educators.all");

  this._onSelect = function() {};

  this._getItems = function( educators ) {
    return educators.map( function( educator ){
      return {
        value: educator.first_name,
        key: educator._id,
        title: educator.first_name + " " + educator.last_name + " (" + educator.facility_name +")",
        after: "ID: " + educator.uniqueId
      };
    });
  };

  return {
    loading: ! handle.ready(),
    items: _getItems( Educators.find({ facility_salesforce_id: currentFacilityId }).fetch() ),
    onSelect: this._onSelect,
    searchBarPlaceholder: currentFacilityName + ": Search by Name or ID ",
  };
}, SearchableList);

export { SearchEducatorsContainer };
