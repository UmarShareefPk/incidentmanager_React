import React from 'react'

function FiveOldestOpenIncidents() {
    return (
      <div className="col s12 m12 l6">
        <div className="widget">
          <h5> Last 5 Unresolved Incidents</h5>
          <Incident />
          <Incident />
          <Incident />
          <Incident />
          <Incident />
        </div>
      </div>
    );
}

const Incident = () => {
    return (
        <div className="incident">
            <span className="timestamp"> 2 months ago</span>
            <a className="title">
            You guys should be pretty worried that people who basically study doom for a living like me are like
            </a>
            <span className="status">
                New
            </span>
        </div>

    );
}

export default FiveOldestOpenIncidents 
