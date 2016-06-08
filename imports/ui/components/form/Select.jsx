
'use strict';

import React from 'react';
import { App } from '../../../api/App.coffee';

var Select = React.createClass({

  propTypes: { 
    options: React.PropTypes.array,
    label: React.PropTypes.string
  },

  defaultProps() {
    return {
      options: [],
      label: ""
    }
  },

  handleChange(i, event) {
    console.log(" in the handle change");
    console.log(event.target.value);
  },

  componentDidMount() {
    //App.getF7App().addView("#smart_select");
    console.log(App.getF7App());
  },

  render(){

    let options = this.props.options.map(( option, i )=> {
      let key = 'option-'+ option.value;
      let selected = i == 0;
      return <Option
        key={ key }
        option={ option }
        selected={ selected }
        onChange={ this.handleChange.bind(this, i) }
      />
    });

    return (
      <ul>
        <li>
          <a id="smart_select" href="#" className="item-link smart-select" data-back-onselect="true">
            <select name="options">
              { options }
            </select>
            <div className="item-content">
              <div className="item-inner">
                <div className="item-title">{ this.props.label }</div>
                <div className="item-after">Jayadeva</div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    );
  }
});

var Option = React.createClass({
  propTypes: {
    option: React.PropTypes.shape({
      text: React.PropTypes.string,
      value: React.PropTypes.string
    }),
    selected: React.PropTypes.bool.isRequired,
    onChange: React.PropTypes.func
  },

  defaultProps(){
    return {
      option: { text: "", value: "" },
      selected: false,
      onChange: function() { return null }
    } 
  },

  render(){
    var { option, selected, onChange } = this.props;
    return (
      <option value={ option.value }> { option.text } </option>
    );
  }
  
})

export { Select };
