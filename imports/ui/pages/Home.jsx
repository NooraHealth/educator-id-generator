'use strict';

//import { React } from 'react';
import React from 'react';

var HomePage = React.createClass({
  onChange(event) {
    console.log("ONE CHANGe");
  },

  render(){
    let options = [
      { value:"one", label:"One" },
      { value:"two", label:"Two" },
      { value:"three", label:"Three" }
    ];
    return (
      <div className="list-block inset">
        <p><a 
          href="/addEducator"
          className="button button-round button-fill large-button"
          > Add Educator
        </a></p>
      </div>
    )
  }
});

export { HomePage };

