import { createContainer } from 'meteor/react-meteor-data';
import { SearchableList } from '../components/searchable_list/List.jsx';
import { Educators } from '../../api/collections/educators.coffee';

export default SearchEducatorsContainer = createContainer(() => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handle = Meteor.subscribe("educators.all");

  this._onSelect = function() {};

  this._getItems = function( educators ) {
    return educators.map( function( educator ){
      return {
        value: educator.first_name,
        key: educator._id,
        title: educator.first_name + " " + educator.last_name,
        after: "ID: " + educator.uniqueId
      };
    });
  };
  
  return {
    loading: ! handle.ready(),
    items: _getItems( Educators.find({}).fetch() ),
    onSelect: this._onSelect,
    searchBarPlaceholder: " Search by Name or ID ",
  };
}, SearchableList);

export { SearchEducatorsContainer };
