
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
      <li>
        <div className="item-content"
          onClick={ onSelect }   
        >
          <div className="item-inner">
            <div className="item-title">
              { title }
            </div>
            <div className="item-after">
              { after }
            </div>
          </div>
        </div>
      </li>
    );
  }
});

export { ListItem };
