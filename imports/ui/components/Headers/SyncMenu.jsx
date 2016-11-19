
'use strict';

import React from 'react';

var SyncMenu = React.createClass({
  render: function(){
    return (
      <div>
        <a href="/" className="ui button"> <i className="arrow right icon"></i>IMPORT FROM SALESFORCE</a>
      </div>
    )
  }
});

export { SyncMenu };
