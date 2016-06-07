'use strict';

import { Form } from '../../components/form/base/Form.jsx';
import React from 'react';

var AddEducatorPage = React.createClass({

  getInitialState() {
    return {
      name: 'Add Name'
    };
  },

  _onSubmit() {
    const name = this.state.name;
    Meteor.call("getUniqueId", function(error, result){
      console.log("in the meteor callback method");
      console.log(error);
      console.log(result);
      swal({
        type: "success",
        title: "Unique Id",
        text: result
      });
    });


    let educator = {
      name: name,
      uniqueId: uniqueId
    };

    console.log("New educator: ", educator);
    //Meteor.call( "insertEducator", educator);

    FlowRouter.go("/");
  },

  setState(field) {
    return ( event ) => {
      console.log("about to set the state of the input");
      console.log("this");
      console.log(this.state);
      console.log(event.target.value);
      console.log(field);
      this.setState({ [field]: event.target.value });
      console.log("this after");
      console.log(this.state);
      this.setState({ "name": event.target.value });
      console.log("this after after");
      console.log(this.state);
    }

  },

  handleChange(event) {
    console.log("in the handleChange");
    console.log(event.target.value);
    console.log(this.state);
    console.log(this);
    this.setState({"name": event.target.value});
  },
    
  render() {
    console.log("Rerendering the form");
    console.log(this.state);
    return (
      <div>
        <Form onSubmit={ this._onSubmit } >
          <Form.Input 
            type='text' 
            key= 'new_educator_name'
            value={ this.state.name }
            onChange={ this.handleChange }
            
          />
        </Form>
      </div>
    )
  }
});

export { AddEducatorPage };
