import React, { PropTypes } from 'react'

var MultiSelectDropdown = React.createClass({

  propTypes: {
    placeholder: React.PropTypes.string,
    options: React.PropTypes.array,
    onChange: React.PropTypes.func
  },

  defaultProps(){
    return {
      placeholder: "",
      onChange: function(){},
      options: []
    }
  },

  componentDidMount() {
    const onChange = this.props.onChange;
    $(this.dropdown).dropdown({
      onChange: function(value, text, selectedItem) {
        onChange(value);
      }
    })
  },

  render(){
    const optionElems = this.props.options.map(function(option, i){
      console.log(option);
      const key = "operation-" + i;
      return <option value={option} key={key}>{option}</option>
    });

    return (
      <div>
        <select
          multiple=""
          className="ui fluid multiple search normal selection dropdown"
          ref={ (elem)=> this.dropdown = elem }
          >
          <option value="">{this.props.placeholder}</option>
          { optionElems }
        </select>
      </div>
    );
  }
});

export { MultiSelectDropdown };
