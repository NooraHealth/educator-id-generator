
'use strict';

import React from 'react';

var FacilityOption = React.createClass({

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

  render(){
    var { label, onSelect } = this.props;
    return (
      <li>
        <div className="item-content">
          <div className="item-inner">
            <div className="item-title">
              { label }
            </div>
          </div>
        </div>
      </li>
    );
  }
});

export { FacilityOption };
