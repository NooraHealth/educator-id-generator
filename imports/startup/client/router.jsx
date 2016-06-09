
import { FlowRouter } from 'meteor/kadira:flow-router';
import React from 'react';
import { mount } from 'react-mounter';

import { MainLayout } from '../../ui/layout.jsx';
import { HomePage } from '../../ui/components/pages/Home.jsx';
import { AddEducatorPage } from '../../ui/components/pages/AddEducator.jsx';
import { Logo } from '../../ui/components/Headers/Logo.jsx';
import { BackButton } from '../../ui/components/Headers/BackButton.jsx';
import { Facilities } from '../../api/collections/facilities.coffee';

FlowRouter.route('/', {
  action: function(){
    console.log("about to render home");
    console.log(MainLayout);
    console.log(HomePage);

    mount( MainLayout, {
      header: <Logo key='logo'/>,
      content: <HomePage key='homepage'/>
    });
  }
});

FlowRouter.route('/addEducator', {
  action: function(){
    //Perf.start();
    //BlazeLayout.render("trackPatients");
    let facilities = Facilities.find().fetch();
    console.log("Getting the facilities");
    console.log(facilities);
    mount( MainLayout, {
      header: <BackButton key='back_button'/>,
      content: <AddEducatorPage key='add_educator_page' facilities={ facilities }/>
    });
  }
});
