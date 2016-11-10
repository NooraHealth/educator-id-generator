  'use strict';

import React from 'react';
import { Form } from '../components/form/base/Form.jsx';
import { Educator } from '../../api/Educators.coffee';
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
    educator: React.PropTypes.instanceOf(Educator)
  },

  defaultProps() {
    return {
      currentFacilityName: "",
      departments: [],
      facilityConditionOperations: [],
      educator: new Educator()
    }
  },

  getInitialState() {
    const educator = this.props.educator.set("facility_name", this.props.currentFacilityName);
    console.log(this.props.currentFacilityName);
    console.log(educator.facility_name);
    console.log(educator);
    return {
      loading: false,
      educator: educator
    }
  },

  componentDidUpdate(prevProps, prevState) {
    //If the facility changed, clear the selected condition operations
    if( this.props.currentFacilityName !== prevProps.currentFacilityName){
      let educator = this.state.educator.set("facility_name", this.props.currentFacilityName );
      let conditionOperations = this.state.educator.condition_operations.clear()
      educator = educator.set("condition_operations", conditionOperations);
      this.setState({ educator: educator });
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
            value={ this.state.educator.department }
            onChange={ this._handleChange("department") }
            source={ source }
          />
          <Form.Input
            type='text'
            key= 'educator_first_name'
            placeholder="First Name"
            icon="doctor icon"
            value={ this.state.educator.first_name }
            onChange={ this._handleChange("first_name") }
          />
          <Form.Input
            type='text'
            key= 'educator_last_name'
            placeholder="Last Name"
            icon="doctor icon"
            value={ this.state.educator.last_name }
            onChange={ this._handleChange("last_name") }

          />
          <Form.Input
              type='tel'
              key= 'educator_phone'
              value={ this.state.educator.phone }
              placeholder="Phone"
              icon="call icon"
              onChange={ this._handleChange("phone") }
            />
          <SelectConditionOperations
            options={ operationOptions }
            selected={ this.state.educator.condition_operations.toArray() }
            onSelectionChange={ this._handleConditionOperationSelection }
            onActivationChange={ this._handleConditionOperationActivationChanged }
          />
        </Form>
      </div>
    )
  },

  _clearForm(){
    let educator = new Educator();
    educator = educator.set("facility_name", this.props.currentFacilityName);
    this.setState({
      educator: educator,
      loading: false
    });
  },

  _handleConditionOperationActivationChanged( opId, isActive ){
    let operations = this.state.educator.condition_operations;
    for (var i = 0; i < this.state.educator.condition_operations.size; i++) {
      if( this.state.educator.condition_operations.get(i).id === opId ){
        let operation = operations.get(i);
        operation.is_active = isActive;
        operations = operations.set(i, operation);
      }
    }
    const educator = this.state.educator.set("condition_operations", operations)
    this.setState({ educator: educator });
  },

  _handleConditionOperationSelection( selectedOperations ){
    let operations = this.state.educator.condition_operations.clear();
    console.log(selectedOperations);
    for (var i = 0; i < selectedOperations.length; i++) {
      operations = operations.push(selectedOperations[i]);
    }
    const educator = this.state.educator.set("condition_operations", operations)
    console.log(educator.condition_operations);
    console.log(educator);
    this.setState({ educator: educator });
  },

  _onSubmit() {
    const that = this;
    try {
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
        that._saveEducator()
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
      const educator = this.state.educator.set(field, value);
      this.setState({ educator: educator })
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
      that._clearForm();
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
    this.state.educator.save().then( results => onSaveSuccess(results), error => onSaveError(error))

  }
});

export { AddEducatorPage };
