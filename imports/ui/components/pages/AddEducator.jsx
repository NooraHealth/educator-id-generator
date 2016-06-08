'use strict';

import { Form } from '../../components/form/base/Form.jsx';
import React from 'react';
import Select from 'react-select';
import { App } from '../../../api/App.coffee'

var AddEducatorPage = React.createClass({

  propTypes: { 
    facilities: React.PropTypes.array
  },

  defaultProps() {
    return {
      facilities: []
    }
  },

  getInitialState() {
    return {
      first_name: '',
      last_name: '',
      phone: '',
      department: ''
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

  handleChange(field) {
    return (event) => {
      console.log("Got a change event");
      console.log(event);
      if(field == "facility") 
        this.setState({ [field]: event.value});
      else
        this.setState({ [field]: event.target.value});
    }
  },
    
  componentDidMount() {
    App.getF7App().addView("#add_educator_view");
  },

  render() {
    console.log("Rerendering the form");
    console.log(this);
    console.log(this.state);
    let facility_options = this.props.facilities.map( function( facility, i ){
      return {
        label: facility.Name,
        value: facility.Id
      }
    });
    return (
      <div id="add_educator_view" className="view view-main">
        <Form onSubmit={ this._onSubmit } >
          <Select 
            name= 'facility_select'
            options={ facility_options }
            onChange={ this.handleChange("facility") }
            placeholder="Facility... Type to search"
          />
          <Form.Input 
            type='text' 
            key= 'educator_first_name'
            placeholder="First Name"
            value={ this.state.first_name }
            onChange={ this.handleChange("first_name") }
            
          />
          <Form.Input 
            type='text' 
            key= 'educator_last_name'
            placeholder="Last Name"
            value={ this.state.last_name }
            onChange={ this.handleChange("last_name") }
            
          />
          <Form.Input 
            type='number' 
            key= 'educator_phone'
            value={ this.state.phone }
            placeholder="Phone"
            onChange={ this.handleChange("phone") }
            
          />
          <Form.Input 
            type='text' 
            key= 'educator_department'
            placeholder="Department"
            value={ this.state.department }
            onChange={ this.handleChange("department") }
          />
        </Form>
      </div>
    )
  }
});

export { AddEducatorPage };
