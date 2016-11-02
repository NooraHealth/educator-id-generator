
import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

import { MainLayout } from '../../ui/layout.jsx';
import { HomePage } from '../../ui/pages/Home.jsx';
import { AddEducatorPage } from '../../ui/pages/AddEducator.jsx';
import { SelectFacilityContainer } from '../../ui/containers/SelectFacilityContainer.jsx';
import { SearchEducatorsContainer } from '../../ui/containers/SearchEducatorsContainer.jsx';
import { AddEducatorContainer } from '../../ui/containers/AddEducatorContainer.jsx';

import { BackButton } from '../../ui/components/Headers/BackButton.jsx';

FlowRouter.route('/', {
  action: function(){
    currentFacilityId = Session.get("current_facility_id");
    currentFacilityName = Session.get("current_facility_name");
    console.log("currentFacilityName");
    console.log(currentFacilityName);
    console.log(currentFacilityId);
    if( !currentFacilityId || currentFacilityId === "")
      FlowRouter.go("/selectFacility");

    mount( MainLayout, {
      content: <HomePage key='homepage'
        currentFacilityName={ currentFacilityName }
        currentFacilityId={ currentFacilityId }
      />
    });
  }
});

FlowRouter.route('/addEducator', {
  action: function(){
    currentFacilityId = Session.get("current_facility_id");
    currentFacilityName = Session.get("current_facility_name");
    mount( MainLayout, {
      nav_components: <BackButton key='back_button'/>,
      content: <AddEducatorContainer key='add_educator_page'
        currentFacilityName={ currentFacilityName }
        currentFacilityId={ currentFacilityId }
      />
    });
  }
});

FlowRouter.route('/selectFacility', {
  action: function(){
    mount( MainLayout, {
      nav_components: <h2 className='ui'>Select Facility</h2>,
      content: <SelectFacilityContainer/>
    });
  }
});

FlowRouter.route('/searchEducators', {
  action: function(){
    currentFacilityId = Session.get("current_facility_id");
    currentFacilityName = Session.get("current_facility_name");
    mount( MainLayout, {
      nav_components: <BackButton key='back_button'/>,
      content: <SearchEducatorsContainer
        currentFacilityName={ currentFacilityName }
        currentFacilityId={ currentFacilityId }
    />
    });
  }
});
