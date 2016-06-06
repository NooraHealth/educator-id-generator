'use strict';

var SearchBar = React.createClass({
                                        
  propTypes: {
    type: React.PropTypes.string,
    classes: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.string,
      requestChange: React.PropTypes.func
    })
  },

  defaultProps(){
    return {
      type: "",
      classes: "",
      placeholder: ""
    }
  },
  
  getInitialState(){ return {} },

  render(){
    var { type, classes, placeholder, valueLink } = this.props;
    return (
      <input 
        type={ type }
        className={ classes } 
        placeholder={ placeholder }
        valueLink={ valueLink }
        />
    ) 
  }
});

this.SearchBar = SearchBar;
