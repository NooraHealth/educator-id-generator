
import React, { PropTypes } from 'react'
import { MultiSelectDropdown } from '../form/MultiSelectDropdown.jsx'
import { Checkbox } from '../form/Checkbox.jsx'

const SelectConditionOperations  = React.createClass({
  propTypes: {
    options: React.PropTypes.arrayOf(( operations, index )=> {
      return new SimpleSchema({
        id: { type:String },
        name: { type:String },
        is_active: { type:Boolean }
      }).validate(operations[index]);
    }),
    selectedOperations: React.PropTypes.arrayOf(( operations, index )=>{
      return new SimpleSchema({
        id: { type:String },
        name: { type:String },
        is_active: { type:Boolean }
      }).validate(operations[index]);
    }),
    onSelectionChange: React.PropTypes.func,
    onActivationChange: React.PropTypes.func
  },

  defaultProps() {
    return {
      options: [],
      selectedOperations: [],
      onSelectionChange: function(){},
      onActivationChange: function(){}
    }
  },

  render () {
    let options = this.props.options.map((option)=> {
        return {
          value: option.id,
          name: option.name
        }
    });
    let selectedOperationsComponents = [];
    for(let i= 0; i < this.props.selectedOperations.length; i++){
      let isActive = this.props.selectedOperations[i].is_active;
      let id = this.props.selectedOperations[i].id;
      let name = this.props.selectedOperations[i].name;
      selectedOperationsComponents.push(
        <div key={ id } className="ui segment item">
          { name }
          <Checkbox
            label='Is Active'
            onChange={ this.props.onActivationChange }
            value={ id }
            checked={ isActive }
            />
        </div>);
    }
    let selected = this.props.selectedOperations.map((op)=>{
      return {
        value: op.id,
        name: op.name
      }
    });
    console.log(selected);
    console.log(selected.length);
    return (
      <div>
        <MultiSelectDropdown
          options={ options }
          selected={ selected }
          label="Add Condition Operations"
          placeholder="Condition Operations"
          onChange={ this._onOperationSelectionChange }
          />
        <div className="ui segments middle aligned selection list">
          { selectedOperationsComponents }
        </div>
      </div>
    )
  },

  _onOperationSelectionChange( ids ){
    let optionsSelected = [];
    for (var i = 0; i < this.props.options.length; i++) {
      if ( ids.indexOf(this.props.options[i].id) !== -1 ) {
        optionsSelected.push(this.props.options[i]);
      }
    }
    this.props.onSelectionChange( optionsSelected );
  }

});

export { SelectConditionOperations };
