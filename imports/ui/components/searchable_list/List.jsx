'use strict';

import React from 'react';
import { ListItem } from './ListItem.jsx';
import { SearchBar } from './SearchBar.jsx';

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

  _handleChange( event ){
    this.setState({ search: event.target.value });
  },

  _getListItems( items ){
    var that = this;
    let components = items.map( function( item ){

      return (
        < ListItem
          key={ item.key }
          title={ item.title }
          after={ item.after }
          value={ item.value }
          onSelect={ that.props.onSelect.bind(that, item.value, item.title) }
        />
      )
    });
    return components;
  },

  render(){
    const search = this.state.search.toLowerCase();
    var filtered = this.props.items.filter(function( item ){
      text = item.title + item.after;
      return text.toLowerCase().indexOf(search) > -1;
    });

    var components = this._getListItems(filtered);
    return (
      <div>
        <div className='list-block inset'>
          <ul>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="fa fa-search fa-2x"></i></div>
                <div className="item-inner">
                  <div className="item-input">
                    <SearchBar
                      type='text'
                      classes='col-75'
                      placeholder={ this.props.searchBarPlaceholder }
                      onChange={ this._handleChange }
                      />
                  </div>
                </div>
              </div>
            </li>
            <hr/>
          </ul>
        </div>

        <div className="list-block">
          <ul>
            { components }
          </ul>
        </div>
      </div>

    )

  }
});

export { SearchableList };
