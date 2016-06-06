'use strict';

import React from 'react';

var Logo = React.createClass({
  render: function(){
    return (
      <a href="/"><img className="logo" alt="Noora Health" src="/NHlogo.png"/></a>
    )
  }
});

export { Logo };
