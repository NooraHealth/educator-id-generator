
import React from 'react';

var MainLayout = React.createClass({
  render: function(){
    return (
      <div>
        <header>
          { this.props.header }
        </header>
        <main>
          <div className="views">
            { this.props.content }
          </div>
        </main>
      </div>
    )
    
  }
});

export { MainLayout };
