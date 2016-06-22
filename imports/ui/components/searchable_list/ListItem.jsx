
'use strict';

import React from 'react';

var ListItem = React.createClass({

  propTypes: { 
    label: React.PropTypes.string,
    value: React.PropTypes.string,
    onSelect: React.PropTypes.func
  },

  defaultProps() {
    return {
      label: "",
      value: "",
      onSelect: null
    }
  },
  
  handleSelect( type ){
    var that = this
    return function() {
      that.props.onSelect( that.props.value );
    }
  },

  render(){
    var { label, onSelect } = this.props;
    return (
      <li>
        <div className="item-content">
          <div className="item-inner">
            <a 
              className="item-title"
              onClick={ onSelect }
              >
              { label }
            </a>
          </div>
        </div>
      </li>
    );
  }
});

export { ListItem };
