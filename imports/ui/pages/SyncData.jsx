'use strict';

//import { React } from 'react';
import React from 'react';

const SyncDataPage = React.createClass({
  getInitialState() {
    return {
      loading: false
    };
  },

  render(){
    return (
      <div className="ui grid">
        { this.state.loading ?
          <div>
          <div className="ui active inline loader"></div>
          This may take a while...........
          </div>
          :

          <div>
          <p className="eight wide column"><a
            onClick= { this._fetchFacilities }
            className="fluid ui blue button"
            > Import Facilities
          </a></p>

          <p className="eight wide column"><a
            onClick= { this._fetchConditionOperations }
            className="fluid ui blue button"
            > Import Condition Operations
          </a></p>

          <p className="eight wide column"><a
            onClick= { this._fetchEducators }
            className="fluid ui yellow button"
            > Import Educators
          </a></p>

          <p className="eight wide column"><a
            onClick= { this._fetchAttendanceReports }
            className="fluid ui yellow button"
            > Import Attendance
          </a></p>
          </div>
      }
      </div>
    )
  },

  _fetchConditionOperations(){
    this.setState({ loading: true });
    Meteor.call("syncConditionOperations", (err, results)=>{
      this.setState({ loading: false });
    });
  },

  _fetchEducators(){
    this.setState({ loading: true });
    Meteor.call("syncEducators", (err, results)=>{
      this.setState({ loading: false });
    });
  },

  _fetchFacilities(){
    this.setState({ loading: true });
    Meteor.call("syncFacilities", (err, results)=>{
      this.setState({ loading: false });
    });
  },

  _fetchAttendanceReports(){
    this.setState({ loading: true });
    Meteor.call("syncAttendance", (err, results)=>{
      console.log(err);
      this.setState({ loading: false });
    });
  },
});

export { SyncDataPage };
