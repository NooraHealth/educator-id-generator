
import { createContainer } from 'meteor/react-meteor-data';
import { AddEducatorPage } from '../pages/AddEducator.jsx';
import { Educators } from '../../api/collections/educators.coffee';
import { AppConfig } from '../../api/AppConfig.coffee';

export default AddEducatorContainer = createContainer(( params ) => {
  var handle = Meteor.subscribe("educators.all");

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

  console.log("educatorToEditId");
  console.log(params);
  console.log(FlowRouter.getParam("id"));
  let educator = null;
  if( params.educatorToEditId !== undefined ){
    educator =  Educators.findOne({ uniqueId: params.educatorToEditId });
  }
  return {
    loading: ! handle.ready(),
    departments: _getDepartments( Educators.find({ facility_name: AppConfig.getFacilityName() }).fetch() ),
    currentFacilityName: AppConfig.getFacilityName(),
    educatorToEdit: educator
  };
}, AddEducatorPage);

export { AddEducatorContainer };
