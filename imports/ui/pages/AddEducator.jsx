'use strict';

import { Form } from '../components/form/base/Form.jsx';
import React from 'react';
import { App } from '../../api/App.coffee';
import { EducatorsSchema } from '../../api/collections/educators.coffee';
import { CurrentFacilityInfo } from '../components/shared/currentFacilityInfo.jsx';

var AddEducatorPage = React.createClass({

  propTypes: {
    currentFacilityId: React.PropTypes.string,
    currentFacilityName: React.PropTypes.string,
    departments: React.PropTypes.array
  },

  defaultProps() {
    return {
      currentFacilityId: "",
      currentFacilityName: ""
    }
  },

  getInitialState() {
    return {
      first_name: '',
      last_name: '',
      phone: '',
      department: '',
      loading: false
    };
  },

  _onSubmit() {
    this.setState({ loading: true });
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    const phone = this.state.phone;
    const department = this.state.department;
    const facilityId = this.props.currentFacilityId;
    const facilityName = this.props.currentFacilityName;
    var _this = this;

    let educator = {
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      department: department,
      facility_name: facilityName,
      facility_salesforce_id: facilityId
    };

    try {
      EducatorsSchema.clean(educator);
      EducatorsSchema.validate(educator);
      swal({
        type: "info",
        closeOnConfirm: true,
        showLoaderOnConfirm: true,
        showCancelButton: true,
        text: "Are you sure you want to register this educator?",
        title: "Confirm"
      }, function( isConfirm ) {
        if( !isConfirm ) {
          _this.setState({ loading: false });
          return;
        }

        const showPopup = ( options, callback )=> {
          Meteor.setTimeout( ()=> {
            console.log("About to show the popup!!!");
            swal(options, callback);
          }, 100 );
        };

        //Meteor.setTimeout(function(){ swal("SOMETHING"); }, 1000);
        Meteor.call("getUniqueId", facilityName, function(error, uniqueId){
          if( error ) {
            showPopup({
              type: "error",
              title: "Sorry!",
              text: "There has been an error retrieving a unique ID"
            });
            _this.setState({ loading: false });
          } else {
            educator.uniqueId = uniqueId;
            Meteor.call( "insertEducator", educator, ( error, id ) => {
              if( error ) {
                showPopup({
                  type: "error",
                  text: error.message,
                  title: "Error inserting educator into database"
                });
                _this.setState({ loading: false });
              } else {
                const text = "Nurse Educator ID: "  + uniqueId;
                console.log("About to make a swal " + text);
                showPopup({
                  type: "success",
                  title: text
                }, function() {
                  _this.setState({ loading: false });
                  FlowRouter.go("/");
                });
              }
            });
          }
        });
      });
    } catch(error) {
      this.setState({ loading: false });
      swal({
        type: "error",
        title: "Oops!",
        text: error.message
      });
    }
  },

  handleChange(field) {
    return (event) => {
      this.setState({ [field]: event.target.value});
    }
  },


  render() {

    let submitText = "GET EDUCATOR ID";
    if( this.state.loading )
      submitText = "...loading..."
    var source = this.props.departments.map( function(dept){
        return { title: dept };
    });
    return (
      <div>
        <Form onSubmit={ this._onSubmit } submitButtonContent={ submitText } disabled={ this.state.loading } >
          <CurrentFacilityInfo name={ this.props.currentFacilityName }/>
          <Form.Input
            type='text'
            key= 'educator_first_name'
            placeholder="First Name"
            icon="doctor icon"
            value={ this.state.first_name }
            onChange={ this.handleChange("first_name") }
          />
          <Form.Input
            type='text'
            key= 'educator_last_name'
            placeholder="Last Name"
            icon="doctor icon"
            value={ this.state.last_name }
            onChange={ this.handleChange("last_name") }

          />
          <Form.Search
            key= 'educator_department'
            placeholder="Department"
            value={ this.state.department }
            onChange={ this.handleChange("department") }
            source={ source }
          />
          <Form.Input
              type='tel'
              key= 'educator_phone'
              value={ this.state.phone }
              placeholder="Phone"
              icon="call icon"
              onChange={ this.handleChange("phone") }

            />
        </Form>
      </div>
    )
  }
});

export { AddEducatorPage };
