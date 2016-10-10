'use strict';

import React from 'react';

var SearchBar = React.createClass({

  propTypes: {
    type: React.PropTypes.string,
    classes: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func
  },

  defaultProps(){
    return {
      type: "",
      classes: "",
      placeholder: ""
    }
  },

  getInitialState(){ return {} },

  render(){
    var { type, classes, placeholder, onChange } = this.props;
    return (
      <input
        type={ type }
        className={ classes }
        placeholder={ placeholder }
        onChange={ onChange }
        />
    )
  }
});

export { SearchBar };
