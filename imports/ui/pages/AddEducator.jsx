  'use strict';

import React from 'react';
import moment from 'moment';
import Immutable from 'immutable'
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
    educator: React.PropTypes.instanceOf(Educator),
    onMount: React.PropTypes.func
  },

  defaultProps() {
    return {
      currentFacilityName: "",
      departments: [],
      facilityConditionOperations: [],
      educator: new Educator(),
      onMount: null
    }
  },

  getInitialState() {
    let educator = this.props.educator.set("facility_name", this.props.currentFacilityName);
    educator = educator.set("facility_salesforce_id", this.props.facilitySalesforceId);
    return {
      loading: false,
      educator: educator
    }
  },

  componentDidMount() {
    if (this.props.onMount !== null) {
      this.props.onMount()
    }
  },

  componentDidUpdate(prevProps, prevState) {
    const changedFacilityName = this.props.currentFacilityName !== prevProps.currentFacilityName;
    const changedFacilityId = this.props.facilitySalesforceId !== prevProps.facilitySalesforceId;
    if( changedFacilityId || changedFacilityName ){
      console.log("Setting the infor");
      let conditionOperations = this.state.educator.condition_operations.clear()
      let educator = this.state.educator.set("facility_name", this.props.currentFacilityName );
      educator = educator.set("facility_salesforce_id", this.props.facilitySalesforceId);
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
        operation_salesforce_id: operation.salesforce_id,
        is_active: false,
        role_salesforce_id: "",
        date_started: moment().format("YYYY-MM-DD")
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
            onDateChange={ this._handleConditionOperationDateChange }
          />
        </Form>
      </div>
    )
  },

  _clearForm(){
    let educator = new Educator();
    educator = educator.set("facility_name", this.props.currentFacilityName);
    educator = educator.set("facility_salesforce_id", this.props.facilitySalesforceId);
    this.setState({
      educator: educator,
      loading: false
    });
  },

  _setConditionOperationField( id, field, value ){
    console.log("Setting " + id + " field: " + field + " to value: " + value);
    let operations = this.state.educator.condition_operations;
    for (var i = 0; i < this.state.educator.condition_operations.size; i++) {
      if( this.state.educator.condition_operations.get(i).id === id ){
        let operation = operations.get(i);
        operation[field] = value;
        operations = operations.set(i, operation);
      }
    }
    const educator = this.state.educator.set("condition_operations", operations)
    console.log(educator);
    this.setState({ educator: educator });
  },

  _handleConditionOperationActivationChanged( opId, isActive ){
    this._setConditionOperationField(opId, "is_active", isActive);
  },

  _handleConditionOperationDateChange( opId, date ){
    this._setConditionOperationField(opId, "date_started", date);
  },

  _handleConditionOperationSelection( selectedOperations ){
    let currentOperations = this.state.educator.condition_operations;
    let newOperations = Immutable.List();
    for (var i = 0; i < selectedOperations.length; i++) {
      newOperations = newOperations.push(selectedOperations[i]);
      for (var j = 0; j < currentOperations.size; j++) {
        console.log("Checking if ");
        if(currentOperations.get(j).id == selectedOperations[i].id){
          console.log("pushing the current operation");
          newOperations = newOperations.set(i, currentOperations.get(j));
        }
      }
    }
    const educator = this.state.educator.set("condition_operations", newOperations);
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
      console.log("Error updating class");
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
