import React ,{useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { GetOldest5UnresolvedIncidents } from '../../../store/actions/dashboardActions';

function FiveOldestOpenIncidents({Oldest5UnresolvedIncidents, getOldest5UnresolvedIncidents}) {

  useEffect(() => {
    getOldest5UnresolvedIncidents();
}, [])

if(Oldest5UnresolvedIncidents == null || Oldest5UnresolvedIncidents.length===0 )
 return <h3>Loading...</h3>

    return (
      <div className="col s12 m12 l6">
        <div className="widget">
          <h5> 5 Oldest Unresolved Incidents</h5>

          {
            Oldest5UnresolvedIncidents.map(incident => {
              return (
                <Incident incident={incident} />
              )
            })
          }
        </div>
      </div>
    );
}

const Incident = ({incident}) => {
    return (
      <div className="incident">
        <div className="time-status">
          <span className="timestamp"> 6 minutes ago</span>
          <span className="status">
            New
          </span>
        </div>

        <div className="title">
          <a >
            {incident.Title}
          </a>
        </div>

      </div>

    );
}

const mapStateToProps = (state) => {        
  return{   
      userId :state.userLogin.userId,  // logged in User Id  
      Oldest5UnresolvedIncidents: state.dashboard.Oldest5UnresolvedIncidentsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOldest5UnresolvedIncidents: () => dispatch(GetOldest5UnresolvedIncidents()),     
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FiveOldestOpenIncidents);
