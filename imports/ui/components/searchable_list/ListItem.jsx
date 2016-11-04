
'use strict';

import React from 'react';

var ListItem = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    value: React.PropTypes.string
  },

  defaultProps() {
    return {
      title: "",
      value: ""
    }
  },

  _handleClick(e){
    this.props.onSelect(this.props.value);
  },

  render(){
    var { title, after, onSelect } = this.props;
    return (
      <div className="ui segment item"
        onClick={ this._handleClick }
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
