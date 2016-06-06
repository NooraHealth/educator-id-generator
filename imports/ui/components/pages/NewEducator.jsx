'use strict';

import { Form } from '../../components/form/base/Form.jsx';
import React from 'react';

var NewEducatorPage = React.createClass({

  mixins: [ LinkedStateMixin ],

  getInitialState() {
    return {
      name: ''
    };
  },

  _onSubmit(){
    var name = this.state.name;

    var educator = {
      name: name,
      language: language,
    };

    console.log("New educator: ", educator);
    Meteor.call( "insertEducator", educator);

    FlowRouter.go("/");
  },
    
  render() {
    return (
      <div>
        <Form onSubmit={ this._onSubmit } >
          <Form.Input 
            type='text' 
            key= 'new_educator_name'
            valueLink={ this.linkState('name') }
          />
        </Form>
      </div>
    )
  }
});

export { NewEducatorPage };
