
'use strict';

import React from 'react';

var ListItem = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    after: React.PropTypes.string,
    value: React.PropTypes.string,
    onSelect: React.PropTypes.func
  },

  defaultProps() {
    return {
      title: "",
      after: "",
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
    var { title, after, onSelect } = this.props;
    return (
      <div className="ui segment item"
        onClick={ onSelect }
      >
        <div className="content">
          <div className="header">
            { title }
          </div>
        </div>
      </div>
    );
  }
});

export { ListItem };
