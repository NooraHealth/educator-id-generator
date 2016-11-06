
import React, { PropTypes } from 'react'
import { MultiSelectDropdown } from '../form/MultiSelectDropdown.jsx'
import { Checkbox } from '../form/Checkbox.jsx'

const SelectConditionOperations  = React.createClass({
  propTypes: {
    options: React.PropTypes.array,
    selectedOperations: React.PropTypes.object,
    onSelectionChange: React.PropTypes.func,
    onActivationChange: React.PropTypes.func
  },

  defaultProps() {
    return {
      conditionOperations: [],
      selectedOperations: {},
      onSelectionChange: function(){},
      onActivationChange: function(){}
    }
  },

  getInitialState() {
    return {
      searchBarValue: ""
    };
  },

  render () {
    const options = this.props.options.map(function( operation ){
      return operation.name;
    });
    let selectedOperationsComponents = [];
    for(key in this.props.selectedOperations){
      let isActive = this.props.selectedOperations[key].active;
      selectedOperationsComponents.push(
        <div key={ key } className="ui segment item">
          { key }
          <Checkbox
            label='Is Active'
            onChange={ this.props.onActivationChange }
            value={ key }
            checked={isActive}
            />
        </div>);
    }
    let selected = Object.keys(this.props.selectedOperations);
    return (
      <div>
        <MultiSelectDropdown
          options={ options }
          selected={ selected }
          label="Add Condition Operations"
          placeholder="Condition Operations"
          onChange={ this.props.onSelectionChange }
          />
        <div className="ui segments middle aligned selection list">
          { selectedOperationsComponents }
        </div>
      </div>
    )
  }
});

export { SelectConditionOperations };
