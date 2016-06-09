'use strict';

import { Form } from '../../components/form/base/Form.jsx';
import React from 'react';
import Select from 'react-select';
import Spinner from 'react-spinkit';
import { App } from '../../../api/App.coffee'
import { EducatorsSchema } from '../../../api/collections/educators.coffee'


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
      department: '',
      loaded: false
    };
  },

  _onSubmit() {
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    const phone = this.state.phone;
    const department = this.state.department;
    const facility = this.state.facility;

    let educator = {
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      department: department,
      facility: facility,
    };

    try {
      EducatorsSchema.clean(educator);
      EducatorsSchema.validate(educator);
      swal({
        type: "info",
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        showCancelButton: true,
        text: "Are you sure you want to register this educator?",
        title: "Confirm"
      }, function() {
        //Meteor.setTimeout(function(){ swal("SOMETHING"); }, 1000);
        Meteor.call("getUniqueId", function(error, uniqueId){
          if( error ) {
            swal({
              type: "error",
              title: "Sorry!",
              text: "There has been an error retrieving a unique ID"
            });
          } else {
            educator.uniqueId = uniqueId;
            Meteor.call( "insertEducator", educator, ( error, id ) => {
              if( error ) {
                swal({
                  type: "error",
                  text: error.message,
                  title: "Error inserting educator into database"
                });
              } else {
                Meteor.call("createEducatorInSalesforce", id, ( error, result ) => {
                  swal({
                    type: "success",
                    title: "Nurse Educator Id " + uniqueId
                  });
                  FlowRouter.go("/");
                });
              }
            });
          }
        });
      });
    } catch(error) {
      console.log("REsult of validation");
      console.log(error);
      swal({
        type: "error",
        title: "Oops!",
        text: error.message
      });
    }
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
    let facility_options = this.props.facilities.map( function( facility, i ){
      return {
        label: facility.name,
        value: facility.salesforce_id
      }
    });

    return (
      <div id="add_educator_view" className="view view-main">
        <Form onSubmit={ this._onSubmit } submitButtonContent="GET EDUCATOR ID" >
          <Select 
            name= 'facility_select'
            value= { this.state.facility }
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
