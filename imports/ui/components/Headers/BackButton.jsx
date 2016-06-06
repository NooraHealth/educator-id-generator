'use strict';

import React from 'react';

var BackButton = React.createClass({
  render: function(){
    return (
      <div className="content-block">
        <p>
          <a href="/" className="button large-button color-green button-fill"> <i className="fa fa-arrow-circle-left icon-in-button"></i>Go Back</a>
        </p>
      </div>
    )
  }
});

export { BackButton };
