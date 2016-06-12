
import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

import { MainLayout } from '../../ui/layout.jsx';
import { HomePage } from '../../ui/pages/Home.jsx';
import { AddEducatorPage } from '../../ui/pages/AddEducator.jsx';
import { SelectFacilityContainer } from '../../ui/containers/SelectFacilityContainer.jsx';
import { Logo } from '../../ui/components/Headers/Logo.jsx';
import { BackButton } from '../../ui/components/Headers/BackButton.jsx';
import { Facilities } from '../../api/collections/facilities.coffee';

FlowRouter.route('/', {
  action: function(){
    mount( MainLayout, {
      header: <Logo key='logo'/>,
      content: <HomePage key='homepage'/>
    });
  }
});

FlowRouter.route('/addEducator', {
  action: function(){
    mount( MainLayout, {
      header: <BackButton key='back_button'/>,
      content: <AddEducatorPage key='add_educator_page' facilities={ facilities }/>
    });
  }
});

FlowRouter.route('/selectFacility', {
  action: function(){
    mount( MainLayout, {
      header: <Logo key='logo'/>,
      content: <SelectFacilityContainer/>
    });
  }
});
