
import React, { PropTypes } from 'react'
import { MultiSelectDropdown } from '../form/MultiSelectDropdown.jsx'

const SelectConditionOperations  = React.createClass({
  propTypes: {
    options: React.PropTypes.array,
    selectedOperations: React.PropTypes.object,
    onSelectionChange: React.PropTypes.func
  },

  defaultProps() {
    return {
      conditionOperations: [],
      selectedOperations: {},
      onSelectionChange: function(){}
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
    for(operation in this.props.selectedOperations){
      selectedOperationsComponents.push(<div key={operation} className="ui segment item">{ operation }</div>);
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