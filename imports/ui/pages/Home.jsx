'use strict';

//import { React } from 'react';
import React from 'react';

const HomePage = React.createClass({

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
      <div>
        <p><a
          href="/addEducator"
          className="fluid ui blue button"
          > Add Educator
        </a></p>

        <p><a
          href="/searchEducators"
          className="fluid ui blue button"
          > Search Educators
        </a></p>
      </div>
    )
  }
});

export { HomePage };
