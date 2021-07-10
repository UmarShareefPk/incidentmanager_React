import React from 'react'

function LastFive() {
    return (
      <div className="col s12 m12 l6">
        <div className="widget">
          <h5> Last 5 Incidents</h5>
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
            <span className="timestamp"> 6 minutes ago</span>
            <a className="title">
                Interior ministry notifies army deployment for Covid SOPs’ implementatione
            </a>
            <span className="status">
                New
            </span>
        </div>

    );
}

export default LastFive 
