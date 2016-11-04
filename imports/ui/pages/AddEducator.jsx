'use strict';

import React from 'react';
import { Form } from '../components/form/base/Form.jsx';
import { EducatorsSchema } from '../../api/collections/educators.coffee';
import { SelectFacilityContainer } from '../containers/SelectFacilityContainer.jsx';

var AddEducatorPage = React.createClass({

  propTypes: {
    currentFacilityName: React.PropTypes.string,
    departments: React.PropTypes.array,
    educatorToEdit: React.PropTypes.object
  },

  defaultProps() {
    return {
      currentFacilityName: "",
      departments: [],
      educatorToEdit: {}
    }
  },

  getInitialState() {
    const educator = this.props.educatorToEdit;
    if(educator !== null){
      return {
        first_name: educator.first_name,
        unique_id: educator.uniqueId,
        last_name: educator.last_name,
        phone: educator.phone,
        department: educator.department,
        uniqueId: educator.uniqueId,
        loading: false
      }
    } else return {
      first_name: '',
      last_name: '',
      phone: '',
      department: '',
      uniqueId: null,
      loading: false
    };
  },

  _onSubmit() {
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    const phone = this.state.phone;
    const department = this.state.department;
    const uniqueId = this.state.uniqueId;
    const facilityName = this.props.currentFacilityName;
    const that = this;

    let educator = {
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      department: department,
      uniqueId: uniqueId,
      facility_name: facilityName,
    };

    try {
      EducatorsSchema.clean(educator);
      EducatorsSchema.validate(educator);
      swal({
        type: "info",
        closeOnConfirm: true,
        showCancelButton: true,
        text: "Are you sure you want to register this educator?",
        title: "Confirm"
      }, function( isConfirm ) {
        if( !isConfirm ) {
          that.setState({ loading: false });
          return;
        }
        that.setState({ loading: true });
        that._saveEducator( educator );
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

  _handleChange(field) {
    return (value) => {
      this.setState({ [field]: value});
    }
  },

  _saveEducator(educator) {

    const that = this;
    const showPopup = ( options, callback )=> {
      Meteor.setTimeout( ()=> {
        swal(options, callback);
      }, 100 );
    };

    const onSaveSuccess = function( educator ){
      const text = "ID: "  + educator.uniqueId;
      that.setState(that.getInitialState());
      showPopup({
        type: "success",
        title: "Nurse Educator Saved Successfully",
        text: text
      });
    };

    const onSaveError = function(educator) {
      that.setState({ loading: false });
      showPopup({
        type: "error",
        text: error.message,
        title: "Error inserting educator into database"
      });
    }

    if( educator.uniqueId !== null ){
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
          Meteor.call( "insertEducator", educator, ( error, result ) => {
            if( error ) {
              onSaveError(educator);
            } else {
              onSaveSuccess(educator);
            }
          });
        }
      });
    }else{
      Meteor.call("updateEducator", educator, ( error, result )=>{
        if( error ) {
          onSaveError(educator);
        } else {
          onSaveSuccess(educator);
        }
      });
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
            onChange={ this._handleChange("department") }
            source={ source }
          />
          <Form.Input
            type='text'
            key= 'educator_first_name'
            placeholder="First Name"
            icon="doctor icon"
            value={ this.state.first_name }
            onChange={ this._handleChange("first_name") }
          />
          <Form.Input
            type='text'
            key= 'educator_last_name'
            placeholder="Last Name"
            icon="doctor icon"
            value={ this.state.last_name }
            onChange={ this._handleChange("last_name") }

          />
          <Form.Input
              type='tel'
              key= 'educator_phone'
              value={ this.state.phone }
              placeholder="Phone"
              icon="call icon"
              onChange={ this._handleChange("phone") }

            />
        </Form>
      </div>
    )
  }
});

export { AddEducatorPage };
