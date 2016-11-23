import { createContainer } from 'meteor/react-meteor-data';
import { AddEducatorPage } from '../pages/AddEducator.jsx';
import { Educators } from '../../api/collections/educators.coffee';
import { Educator } from '../../api/Educators.coffee';
import { ConditionOperations } from '../../api/collections/condition_operations.coffee';
import { AppConfig } from '../../api/AppConfig.coffee';

export default AddEducatorContainer = createContainer(( params ) => {
  var educators_handle = Meteor.subscribe("educators.all");
  var condition_operations_handle = Meteor.subscribe("condition_operations.all");

  this._getConditionOperations = function( facilityName ) {
    return ConditionOperations.find({ facility_name: facilityName }).fetch();
  };

  this._getDepartments = function( educators ) {
    departments = educators.map( function( educator ){
      return educator.department;
    });
    filtered = []
    departments.forEach( function(department){
      if( filtered.indexOf(department) == -1){
        filtered.push(department);
      };
    });
    return filtered;
  };

  let educator = null;
  if( params.educatorToEditId !== undefined ){
    educator =  Educators.findOne({ uniqueId: params.educatorToEditId });
  }
  //ensure the educator and the current facility are synced
  const _onMount = () => {
    if (educator && educator.facility_name !== AppConfig.getFacilityName()) {
      AppConfig.setFacilityName(educator.facility_name);
    }
  }

  return {
    loading: !(educators_handle.ready() && condition_operations_handle.ready()) ,
    departments: _getDepartments( Educators.find({ facility_name: AppConfig.getFacilityName() }).fetch() ),
    facilityConditionOperations: _getConditionOperations( AppConfig.getFacilityName() ),
    currentFacilityName: AppConfig.getFacilityName(),
    educator: new Educator(educator),
    onMount: _onMount
  };
}, AddEducatorPage);

export { AddEducatorContainer };
