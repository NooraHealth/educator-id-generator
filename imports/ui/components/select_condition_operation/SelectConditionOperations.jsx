
import React, { PropTypes } from 'react';
import { MultiSelectDropdown } from '../form/MultiSelectDropdown.jsx';
import { Checkbox } from '../form/Checkbox.jsx';

const SelectConditionOperations  = React.createClass({
  propTypes: {
    options: React.PropTypes.arrayOf(( operations, index )=> {
      return new SimpleSchema({
        id: { type:String },
        name: { type:String },
        is_active: { type: Boolean }
      }).validate(operations[index]);
    }),
    selected: React.PropTypes.arrayOf(( operations, index )=> {
      return new SimpleSchema({
        id: { type:String },
        name: { type:String },
        is_active: { type: Boolean }
      }).validate(operations[index]);
    }),
    onSelectionChange: React.PropTypes.func,
    onActivationChange: React.PropTypes.func
  },

  defaultProps() {
    return {
      options: [],
      selected: [],
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
    let selected = this.props.selected.map((option)=> {
        return {
          value: option.id,
          name: option.name
        }
    });

    let selectedOperationsComponents = [];
    for(let i= 0; i < this.props.selected.length; i++){
      let isActive = this.props.selected[i].is_active;
      let id = this.props.selected[i].id;
      let name = this.props.selected[i].name;
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

    return (
      <div>
        <MultiSelectDropdown
          options={ options }
          selected={ selected  }
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
