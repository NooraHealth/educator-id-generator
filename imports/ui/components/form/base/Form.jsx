'use strict';

import React from 'react';
import { Input } from '../Input.jsx';
import { Select } from '../Select.jsx';

var Form = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func, 
    submitButtonContent: React.PropTypes.string
  },

  defaultProps(){
    return {
      onSubmit: function(){},
      children: [] 
    }
  },

  getInitialState(){ return {} },

  render(){
    let onSubmit = this.props.onSubmit;
    let submitButtonContent = this.props.submitButtonContent;
    let children = React.Children.map( this.props.children, function( child ){
      return <div><hr/><li> {child} </li></div>
    });

    return (
      <div className="list-block inset">
        <ul>
          { children }
        </ul>
        <p><a key='submitbutton' className="button button-round button-fill button-big" onClick={ onSubmit }>{ submitButtonContent }</a></p>
      </div>
    )
  }
});
  

Form.Input = Input;
Form.Select = Select;

export { Form };

