'use strict';

var Checkbox = React.createClass({
  mixins: [ GetValueLink ],

  propTypes: {
    title: React.PropTypes.string,
    valueLink: React.PropTypes.shape({
      value: React.PropTypes.bool,
      requestChange: React.PropTypes.func
    })
  },

  defaultProps(){
    return {
      title: "",
      valueLink: null
    }
  },

  handleChange( event ){
    this._getValueLink(this.props).requestChange(event.target.value);
  },

  shouldComponentUpdate( nextProps, nextState ){
    if(this._getValueLink(this.props).value == this._getValueLink(nextProps).value)
      return false
    else
      return true
  },

  render(){
    var { title, valueLink, handleChange, ...inputProps } = this.props;
    return (
      <label className="label-checkbox item-content">
        <input { ...inputProps } checkedLink={ valueLink } type="checkbox"/>
        <div className="item-media">
          <i className="icon icon-form-checkbox"></i>
        </div>
        <div className="item-inner">
          <div className="item-title">{ title }</div>
        </div>
      </label>
    );
  }
});

this.Form.Checkbox = Checkbox;
