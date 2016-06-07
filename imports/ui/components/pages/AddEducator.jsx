'use strict';

import { Form } from '../../components/form/base/Form.jsx';
import React from 'react';

var AddEducatorPage = React.createClass({

  getInitialState() {
    return {
      first_name: '',
      last_name: '',
      phone: '',
      department: '',
    };
  },

  _onSubmit() {
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    const phone = this.state.phone;
    const department = this.state.department;

    Meteor.call("getUniqueId", function(error, result){
      swal({
        type: "success",
        title: "Unique Id: " + result,
      });

      let educator = {
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        department: department,
        uniqueId: result
      };

      Meteor.call( "insertEducator", educator);
    })

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
            key= 'educator_first_name'
            placeholder="First Name"
            value={ this.state.first_name }
            onChange={ this.handleChange }
            
          />
          <Form.Input 
            type='text' 
            key= 'educator_last_name'
            placeholder="Last Name"
            value={ this.state.last_name }
            onChange={ this.handleChange }
            
          />
          <Form.Input 
            type='number' 
            key= 'educator_phone'
            value={ this.state.phone }
            placeholder="Phone"
            onChange={ this.handleChange }
            
          />
          <Form.Input 
            type='text' 
            key= 'educator_department'
            placeholder="Department"
            value={ this.state.department }
            onChange={ this.handleChange }
            
          />
        </Form>
      </div>
    )
  }
});

export { AddEducatorPage };
