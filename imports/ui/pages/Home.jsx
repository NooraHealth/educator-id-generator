'use strict';

//import { React } from 'react';
import React from 'react';
import { CurrentFacilityInfo } from '../components/shared/currentFacilityInfo.jsx';

var HomePage = React.createClass({

  propTypes: { 
    currentFacilityName: React.PropTypes.string
  },

  defaultProps() {
    return {
      currentFacilityName: ""
    }
  },

  render(){
    return (
      <div className="list-block inset">
        <CurrentFacilityInfo name={ this.props.currentFacilityName }/>
        <p><a 
          href="/addEducator"
          className="button button-round button-fill large-button"
          > Add Educator
        </a></p>

        <p><a 
          href="/searchEducators"
          className="button button-round button-fill large-button"
          > Search Educators
        </a></p>
      </div>
    )
  }
});

export { HomePage };

