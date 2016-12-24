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

  _onSelect(uniqueId) {
    FlowRouter.go("addEducator", { educatorToEditId: uniqueId });
  },

  render() {
    const items = this.props.educators.map( function( educator ){
      let firstName = (educator.first_name !== undefined)? educator.first_name: "";
      return {
        value: educator.uniqueId,
        key: educator.uniqueId,
        title: firstName + " " + educator.last_name,
        description: "ID: " + educator.uniqueId + " PHONE: " + educator.phone + " DEPARTMENT: " + educator.department,
        to_search: educator.first_name + " " + educator.last_name + " " + educator.uniqueId,
        icon: "edit icon"
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
