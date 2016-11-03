
'use strict';

import React from 'react';

var Search = React.createClass({

  propTypes: {
    value: React.PropTypes.string,
    label: React.PropTypes.string,
    icon: React.PropTypes.string,
    onChange: React.PropTypes.func,
    source: React.PropTypes.array
  },

  defaultProps() {
    return {
      value: "",
      icon: "",
      onChange: null
    }
  },

  componentDidMount() {
    const changeInputValue = (function(e) {
      const activeResult = $(".result.active");
      const text = $(".result.active").text();
      const acceptedKeyCodes = [ 13, 40, 38 ];
      if(
        acceptedKeyCodes.indexOf(e.keyCode) != -1 &&
        activeResult.length == 1 &&
        text != this.props.value ){
          this.props.onChange( text );
      }
    }).bind(this);

    $(this.input).keyup(changeInputValue);
  },

  componentDidUpdate() {
    $(this.search)
      .search({
        source: this.props.source,
        searchFields: [
          'title'
        ],
        searchFullText: false,
        minCharacters: 0
      });
  },

  handleClick( onChange, e ){
    const onResultClicked = function(e) {
      let text = $(e.target).text();
      onChange( text );
    };

    $(this.search).find(".result").click(onResultClicked);
  },

  handleChange( onChange, e ){
    if(e.target && e.target.value !== undefined ) {
      onChange(e.target.value);
    }
  },

  render(){
    var { label, icon, value, onChange, source, loading, ...inputProps } = this.props;
    const getInputClasses = function() {
      const defaultClasses = "ui fluid left ";
      const type = (icon)? "icon": "labeled";
      return defaultClasses + type + " input";
    }
    const getInputPrefix = function() {
      if( icon ){
        return <i className={icon}></i>;
      } else {
        return (
          <div className="ui label">
              { label }
          </div>
        )
      }
    }
    return (
      <div
        className="ui search"
        ref={ (search)=> this.search = search }
        >
        <div className={ getInputClasses() }>
          { getInputPrefix() }
          <input
            { ...inputProps }
            className="prompt"
            type="text"
            value={ value }
            onBlur={ this.handleClick.bind(this, onChange) }
            onChange={ this.handleChange.bind(this, onChange) }
            ref={ (input) => this.input = input }
            />
        </div>
        <div className="results"></div>
      </div>
    );
  }
});

export { Search };
