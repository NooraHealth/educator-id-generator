'use strict';

//import { React } from 'react';
import React from 'react';

console.log("React");
console.log(React);

var HomePage = React.createClass({
  render(){
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

