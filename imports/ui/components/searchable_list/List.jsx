'use strict';

import React from 'react';
import { ListItem } from './ListItem.jsx';
import { Input } from '../form/Input.jsx';

var SearchableList = React.createClass({

  propTypes: {
    items: React.PropTypes.shape({
      value: React.PropTypes.string,
      key: React.PropTypes.string,
      title: React.PropTypes.string
    }),
    onSelect: React.PropTypes.func,
    searchBarPlaceholder: React.PropTypes.string
  },

  defaultProps(){
    return {
      items: [],
      onSelect: function(){}
    }
  },

  getInitialState(){
    return {
      search: ""
    }
  },

  _handleChange( value ){
    this.setState({ search: value });
  },

  _getListItems( items ){
    const that = this;
    const components = items.map( function( item ){
      return (
        < ListItem
          key={ item.key }
          title={ item.title }
          value={ item.value }
          onSelect={ that.props.onSelect }
        />
      )
    });
    return components;
  },

  render(){
    const search = this.state.search.toLowerCase();
    var filtered = this.props.items.filter(function( item ){
      let text = item.title + item.after;
      return text.toLowerCase().indexOf(search) > -1;
    });

    var components = this._getListItems(filtered);
    return (
      <div>
        <h1 className='ui header'>{ this.props.header }</h1>
          <Input
            type='text'
            placeholder={ this.props.searchBarPlaceholder }
            onChange={ this._handleChange }
            icon='search icon'
            />
          <div className="ui segments middle aligned selection list">
            { components }
          </div>
      </div>

    )

  }
});

export { SearchableList };
