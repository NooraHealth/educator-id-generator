'use strict';

import React from 'react';
import { Form } from '../components/form/base/Form.jsx';
import { SearchableList } from '../components/searchable_list/List.jsx';
import { SelectFacilityContainer } from '../containers/SelectFacilityContainer.jsx';

var SearchEducatorsPage = React.createClass({

  propTypes: {
    educators: React.PropTypes.array
  },

  defaultProps() {
    return {
      educators: []
    }
  },

  _onSelect(){

  },

  render() {
    const items = this.props.educators.map( function( educator ){
      return {
        value: educator.first_name,
        key: educator._id,
        title: educator.first_name + " " + educator.last_name + " ID: " + educator.uniqueId
      };
    });

    return (
      <div>
        <SelectFacilityContainer/>
        <SearchableList
          items={ items }
          searchBarPlaceholder="Search Educators"
          icon="search icon"
          onSelect={ this._onSelect }
          />
      </div>
    )
  }
});

export { SearchEducatorsPage };
