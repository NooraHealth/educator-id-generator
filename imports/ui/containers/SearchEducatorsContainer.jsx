import { createContainer } from 'meteor/react-meteor-data';
import { SearchEducatorsPage } from '../pages/SearchEducators.jsx';
import { Educators } from '../../api/collections/educators.coffee';
import { AppConfig } from '../../api/AppConfig.coffee';

export default SearchEducatorsContainer = createContainer(( params ) => {
  var handle = Meteor.subscribe("educators.all");

  return {
    loading: ! handle.ready(),
    educators: Educators.find({ facility_name: AppConfig.getFacilityName() }).fetch()
  };
}, SearchEducatorsPage);

export { SearchEducatorsContainer };
