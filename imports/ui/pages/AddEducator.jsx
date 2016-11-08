  'use strict';

import React from 'react';
import update from 'immutability-helper';
import { Form } from '../components/form/base/Form.jsx';
import { Educators } from '../../api/collections/educators.coffee';
import { EducatorsSchema } from '../../api/collections/educators.coffee';
import { ConditionOperationsSchema } from '../../api/collections/condition_operations.coffee';
import { SelectFacilityContainer } from '../containers/SelectFacilityContainer.jsx';
import { SelectConditionOperations } from '../components/select_condition_operation/SelectConditionOperations.jsx';

var AddEducatorPage = React.createClass({

  propTypes: {
    currentFacilityName: React.PropTypes.string,
    departments: React.PropTypes.array,
    facilityConditionOperations: React.PropTypes.arrayOf(( operations, index )=> {
      return ConditionOperationsSchema.validate(operations[index]);
    }),
    educatorToEdit: React.PropTypes.objectOf((educator)=>{
      return EducatorsSchema.validate(educator);
    })
  },

  defaultProps() {
    return {
      currentFacilityName: "",
      departments: [],
      facilityConditionOperations: [],
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
        phone: educator.phone.toString(),
        department: educator.department,
        condition_operations: educator.condition_operations,
        uniqueId: educator.uniqueId,
        loading: false
      }
    } else return {
      first_name: '',
      last_name: '',
      phone: '',
      department: '',
      condition_operations: [],
      uniqueId: null,
      loading: false
    };
  },
  componentDidUpdate(prevProps, prevState) {
    //If the facility changed, clear the selected condition operations
    if( this.props.currentFacilityName !== prevProps.currentFacilityName){
      console.log("Setting condition operations to[]");
      this.setState({ condition_operations: [] })
    }
  },

  render() {
    let submitText = "SAVE EDUCATOR";
    if( this.state.loading )
      submitText = "...loading..."
    const source = this.props.departments.map( function(dept){
        return { title: dept };
    });
    const operationOptions = this.props.facilityConditionOperations.map((operation) =>{
      return {
        id: operation._id,
        name: operation.name,
        is_active: false
      }
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
          <SelectConditionOperations
            options={ operationOptions }
            selectedOperations={ this.state.condition_operations }
            onSelectionChange={ this._handleConditionOperationSelection }
            onActivationChange={ this._handleConditionOperationActivationChanged }
          />
        </Form>
      </div>
    )
  },

  _clearForm(){
    this.setState({
      first_name: '',
      last_name: '',
      phone: '',
      department: '',
      condition_operations: [],
      uniqueId: null,
      loading: false
    });
  },

  _handleConditionOperationActivationChanged( opId, isActive ){
    console.log("activation chagned!!!");
    let operations = this.state.condition_operations;
    let newOperations = []
    for (var i = 0; i < operations.length; i++) {
      if( operations[i].id === opId ){
        operations[i].is_active = isActive;
        newOperations.push(operations[i]);
      }
    }
    this.setState({ condition_operations: newOperations })
  },

  _handleConditionOperationSelection( selectedOperations ){
    let operations = this.state.condition_operations;
    console.log("Trying to set to this");
    console.log(selectedOperations);
    console.log(operations);
    let newOperations = update(operations, {$set: selectedOperations});
    console.log("NEW OPERATIONS!!");
    console.log(operations);
    // this.setState({ condition_operations: newOperations })
    // console.log(this.state.condition_operations);
    console.log(this.state.condition_operations.length);
  },

  _onSubmit() {
    const first_name = this.state.first_name;
    const last_name = this.state.last_name;
    const phone = this.state.phone;
    const department = this.state.department;
    const uniqueId = this.state.uniqueId;
    const condition_operations = this.state.condition_operations;
    const facilityName = this.props.currentFacilityName;
    const that = this;

    let educator = {
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      department: department,
      condition_operations: condition_operations,
      uniqueId: uniqueId,
      facility_name: facilityName,
    };

    try {
      EducatorsSchema.clean(educator, { getAutoValues: false });
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
      that._clearForm()
      showPopup({
        type: "success",
        title: "Nurse Educator Saved Successfully",
        text: text
      });
    };

    const onSaveError = function(error) {
      that.setState({ loading: false });
      showPopup({
        type: "error",
        text: error.message,
        title: "Error inserting educator into database"
      });
    }

    if( educator.uniqueId == null ){
      Meteor.call("getUniqueId", educator.facility_name, function(error, uniqueId){
        if( error ) {
          showPopup({
            type: "error",
            title: "Sorry!",
            text: "There has been an error retrieving a unique ID"
          });
          that.setState({ loading: false });
        } else {
          educator.uniqueId = uniqueId;
          Meteor.call( "insertEducator", educator, ( error, result ) => {
            if( error ) {
              onSaveError(error);
            } else {
              onSaveSuccess(educator);
            }
          });
        }
      });
    }else{
      Meteor.call("updateEducator", educator, ( error, result )=>{
        if( error ) {
          onSaveError(error);
        } else {
          onSaveSuccess(educator);
        }
      });
    }
  }
});

export { AddEducatorPage };
