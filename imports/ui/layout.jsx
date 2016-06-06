
import React from 'react';

var MainLayout = React.createClass({
  render: function(){
    return (
      <div>
        <header>
          { this.props.header }
        </header>
        <main>
          { this.props.content }
        </main>
      </div>
    )
    
  }
});

export { MainLayout };
