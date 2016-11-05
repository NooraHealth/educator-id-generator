
import React, { PropTypes } from 'react'
import { MultiSelectDropdown } from '../form/MultiSelectDropdown.jsx'

const SelectConditionOperations  = React.createClass({
  propTypes: {
    conditionOperations: React.PropTypes.array,
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
    const options = this.props.conditionOperations.map(function( operation ){
      return operation.name;
    });
    let selectedOperationsComponents = [];
    for(operation in this.props.selectedOperations){
      selectedOperationsComponents.push(<div className="ui segment item">{ operation }</div>);
    }
    return (
      <div>
        <MultiSelectDropdown
          multiple="{ selected }"
          options={ options }
          placeholder="Add To Condition Operations"
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
