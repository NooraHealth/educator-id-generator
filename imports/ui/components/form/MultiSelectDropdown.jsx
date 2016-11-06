import React, { PropTypes } from 'react'

var MultiSelectDropdown = React.createClass({

  propTypes: {
    placeholder: React.PropTypes.string,
    options: React.PropTypes.array,
    selected: React.PropTypes.array,
    onChange: React.PropTypes.func
  },

  defaultProps(){
    return {
      placeholder: "",
      onChange: function(){},
      options: [],
      selected: []
    }
  },

  componentDidMount() {
    const onChange = this.props.onChange;
    $(this.dropdown).dropdown({
      onChange: function(value, text, selectedItem) {
        onChange(value);
      }
    });
    $(this.dropdown).dropdown("set exactly", this.props.selected);
  },

  componentDidUpdate(prevProps, prevState) {
    if( JSON.stringify(this.props.selected) !== JSON.stringify(prevProps.selected)){
      $(this.dropdown).dropdown("set exactly", this.props.selected);
    }
  },

  render(){
    const optionElems = this.props.options.map(function(option, i){
      const key = "operation-" + i;
      return <option value={option} key={key}>{option}</option>
    });

    return (
      <div>
        <div className="ui sub header">{ this.props.label }</div>
        <select
          className="ui fluid multiple search normal selection dropdown"
          ref={ (elem)=> this.dropdown = elem }
          multiple=""
          >
          <option value="">{this.props.placeholder}</option>
          { optionElems }
        </select>
      </div>
    );
  }
});

export { MultiSelectDropdown };
