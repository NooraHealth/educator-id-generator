
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
    console.log(icon);
    return (
      <div className="ui fluid left icon input">
        <i className={ icon }></i>
        <input
          { ...inputProps }
          value={ value }
          onChange={ onChange }
        />
      </div>
    );
  }
});

export { Input };
