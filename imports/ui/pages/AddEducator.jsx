'use strict';

import React from 'react';
import { Form } from '../components/form/base/Form.jsx';
import { EducatorsSchema } from '../../api/collections/educators.coffee';
import { SelectFacilityContainer } from '../containers/SelectFacilityContainer.jsx';

var AddEducatorPage = React.createClass({

  propTypes: {
    currentFacilityName: React.PropTypes.string,
    departments: React.PropTypes.array
  },

  defaultProps() {
    return {
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
    const facilityName = this.props.currentFacilityName;
    var _this = this;

    let educator = {
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      department: department,
      facility_name: facilityName,
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
                showPopup({
                  type: "success",
                  title: text
                }, function() {
                  _this.setState(_this.getInitialState());
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
    return (value) => {
      this.setState({ [field]: value});
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
          <SelectFacilityContainer/>
          <Form.Search
            key= 'educator_department'
            placeholder="Department"
            icon="search icon"
            value={ this.state.department }
            onChange={ this.handleChange("department") }
            source={ source }
          />
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
