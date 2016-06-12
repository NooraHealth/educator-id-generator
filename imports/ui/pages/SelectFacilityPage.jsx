'use strict';

import React from 'react';
import { FacilityOption } from '../components/select_facility/FacilityOption.jsx';
import { SearchBar } from '../components/form/SearchBar.jsx';

var SelectFacilityPage = React.createClass({
                                        
  propTypes: {
    facilities: React.PropTypes.array
  },

  defaultProps(){
    return {
      facilities: []
    }
  },

  getInitialState(){
    return {
      search: ""
    }
  },

  _handleChange( event ){
    console.log("handling serach bar change " + event.target.value);
    this.setState({ search: event.target.value });
  },

  _onSelect( id, name ){
    return ()=> {
      console.log("id" + id);
      Session.set("current_facility_id", id);
      Session.set("current_facility_name", name);
      console.log("Set the sessiong");
      console.log(Session.get("selected_facility_id"));
      console.log(Session.get("selected_facility_name"));
      FlowRouter.go("/");
    } 
  },

  _getFacilityComponents( facilities ){
    var that = this;
    let components = facilities.map( function( facility ){
      return (
        < FacilityOption
          key={ facility._id }
          label={ facility.name }
          value={ facility.salesforce_id }
          onSelect={ that._onSelect( facility.salesforce_id, facility.name ) }
        />
      )
    });
    return components;
  },

  render(){

    const search = this.state.search.toLowerCase();
    var filtered = this.props.facilities.filter(function( facility ){
      return facility.name.toLowerCase().indexOf(search) > -1;
    });

    var facilityComponents = this._getFacilityComponents(filtered);
    return (
      <div>
        <div className='list-block inset'>
          <ul>
            <hr/>
            <li>
              <div className="item-content">
                <div className="item-media"><i className="fa fa-search fa-2x"></i></div>
                <div className="item-inner">
                  <div className="item-input">
                    <SearchBar
                      type='text'
                      classes='col-75'
                      placeholder='Search facilities'
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
            { facilityComponents }
          </ul>
        </div>
      </div>

    ) 
  
  }
});

export { SelectFacilityPage };
