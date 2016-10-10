
'use strict';

import React from 'react';

var CurrentFacilityInfo = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },

  defaultProps(){
    return {
      name: ""
    }
  },

  render(){
    return (
      <p> Current Facility: <em> { this.props.name }  </em><a href="/selectFacility"> Change </a></p>
    )
  }
});

export { CurrentFacilityInfo };
