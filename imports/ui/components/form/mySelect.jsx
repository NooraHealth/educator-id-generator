
var Select = React.createClass({

  propTypes: { 
    options: React.PropTypes.array
  },

  defaultProps() {
    return {
      facilities: []
    }
  },

  getInitialState() {
    return {
      first_name: '',
      last_name: '',
      phone: '',
      department: '',
      loading: false
    };
  },

  render: ()=> {
    let options = this.props.options.map(function(option, i){
      return <Option
        value={ option.value }
        label={ option.label }
        onSelect={ _this.props.onChange }
    });

    return (
      <select 
        className= "Select Select--single"> 
        { this.options }
      </select>
    )
  }
});



