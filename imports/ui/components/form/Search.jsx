
'use strict';

import React from 'react';

var Search = React.createClass({

  propTypes: {
    value: React.PropTypes.string,
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
      console.log("Text of active " + text);
      console.log("Value " + this.props.value);
      if( activeResult.length == 1 && text != this.props.value ){
        this.props.onChange({ target: { value: text } });
      }
    }).bind(this);

    $(".prompt").keyup(changeInputValue);
  },

  componentDidUpdate() {
    $('#search')
      .search({
        source: this.props.source,
        searchFields: [
          'title'
        ],
        searchFullText: false,
        minCharacters: 0
      });
  },

  handleChange( onValueChange, e ){
    const onResultClicked = function(e) {
      let text = $(e.target).text();
      onValueChange({ target: { value: text } });
    };

    $(".result").click(onResultClicked);
  },

  render(){
    var { value, onChange, source, ...inputProps } = this.props;
    console.log("The value " +value);
    return (
      <div id="search" className="ui search">
        <div className="ui fluid left icon input">
          <input
            { ...inputProps }
            className="prompt"
            type="text"
            value={ value }
            onBlur={ this.handleChange.bind(this, onChange) }
            onChange={ onChange }
            />
          <i className="search icon"></i>
        </div>
        <div className="results"></div>
      </div>
    );
  }
});

export { Search };
