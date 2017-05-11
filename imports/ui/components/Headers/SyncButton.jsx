'use strict';

import React from 'react';

var SyncButton = React.createClass({
  render: function(){
    return (
      <div>
        <a href="/syncData" className="ui inverted button"> Sync Data </a>
      </div>
    )
  }
});

export { SyncButton };
