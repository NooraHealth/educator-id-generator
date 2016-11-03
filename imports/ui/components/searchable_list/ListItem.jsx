
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

  // handleSelect( type ){
  //   const onSelect = this.props.onSelect;
  //   return function() {
  //     onSelect( that.props.value );
  //   }
  // },

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
