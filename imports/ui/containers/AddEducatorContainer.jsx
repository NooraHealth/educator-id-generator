
import { createContainer } from 'meteor/react-meteor-data';
import { AddEducatorPage } from '../pages/AddEducator.jsx';
import { Educators } from '../../api/collections/educators.coffee';

export default AddEducatorContainer = createContainer(( params ) => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted

  const { currentFacilityId, currentFacilityName } = params;

  var handle = Meteor.subscribe("educators.all");

  this._getDepartments = function( educators ) {
    departments = educators.map( function( educator ){
      return educator.department;
    });
    filtered = []
    departments.forEach( function(department){
      if( filtered.indexOf(department) == -1){
        filtered.push( department );
      };
    });
    return filtered;
  };

  return {
    loading: ! handle.ready(),
    departments: _getDepartments( Educators.find({ facility_salesforce_id: currentFacilityId }).fetch() ),
  };
}, AddEducatorPage);

export { AddEducatorContainer };
