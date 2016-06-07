
'use strict';

import React from 'react';

var Input = React.createClass({

  propTypes: { 
    value: React.PropTypes.string,
    icon: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  defaultProps() {
    return {
      value: "",
      icon: "",
      onChange: null
    }
  },

  render(){
    var { title, icon, value, onChange, ...inputProps } = this.props;
    return (
      <div className="item-content">
        <div className="item-media"><i className={ icon }></i></div>
        <div className="item-inner">
          <div className="item-input">
            <input { ...inputProps } value={ value } onChange={ onChange } />
          </div>
        </div>
      </div>
    );
  }
});

export { Input };
