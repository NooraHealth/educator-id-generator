
import { createContainer } from 'meteor/react-meteor-data';
import { SearchEducatorsPage } from '../pages/Sea.jsx';
import { Facilities } from '../../api/collections/facilities.coffee';

export default SelectFacilityContainer = createContainer(() => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handle = Meteor.subscribe("facilities.all");

  return {
    loading: ! handle.ready(),
    facilities: Facilities.find({}).fetch(),
  };
}, SelectFacilityPage);

export { SelectFacilityContainer };
