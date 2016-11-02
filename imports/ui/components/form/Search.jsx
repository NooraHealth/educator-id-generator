
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

  render(){
    var { value, onChange, source, ...inputProps } = this.props;
    return (
      <div id="search" className="ui search">
        <div className="ui fluid left icon input">
          <input
            { ...inputProps }
            className="prompt"
            type="text"
            value={ value }
            onChange={ onChange }/>
          <i className="search icon"></i>
        </div>
        <div className="results"></div>
      </div>
    );
  }
});

export { Search };
