
'use strict';

import React from 'react';

var Input = React.createClass({
  propTypes: { 
    value: React.PropTypes.string,
    icon: React.PropTypes.string,
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.string,
      requestChange: React.PropTypes.func
    })
  },

  defaultProps() {
    return {
      value: "",
      icon: "",
      valueLink: null
    }
  },

  render(){
    var { title, icon, valueLink, ...inputProps } = this.props;
    return (
      <div className="item-content">
        <div className="item-media"><i className={ icon }></i></div>
        <div className="item-inner">
          <div className="item-input">
            <input { ...inputProps } valueLink={ valueLink } />
          </div>
        </div>
      </div>
    );
  }
});

export { Input };
