import { createContainer } from 'meteor/react-meteor-data';
import { SearchEducatorsPage } from '../pages/SearchEducators.jsx';
import { Educators } from '../../api/collections/educators.coffee';
import { AppConfig } from '../../api/AppConfig.coffee';

export default SearchEducatorsContainer = createContainer(( params ) => {
  var handle = Meteor.subscribe("educators.all");
  const query = (AppConfig.getFacilityName() == "")? {} : { facility_name: AppConfig.getFacilityName() };

  return {
    loading: ! handle.ready(),
    educators: Educators.find(query).fetch()
  };
}, SearchEducatorsPage);

export { SearchEducatorsContainer };
