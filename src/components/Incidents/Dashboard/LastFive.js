import React ,{useEffect, useState} from 'react'
import { GetOverallWidget } from '../../../store/actions/dashboardActions';
import { connect } from 'react-redux';
import { GetLast5Incidents } from '../../../store/actions/dashboardActions';

function LastFive({Last5IncidentsData, getLast5IncidentsData}) {

  useEffect(() => {
    getLast5IncidentsData();
}, [])

if(Last5IncidentsData == null || Last5IncidentsData.length==0 )
 return <h3>Loading...</h3>

console.log("Last5", Last5IncidentsData);
    return (
      <div className="col s12 m12 l6">
        <div className="widget">
          <h5> Last 5 Incidents</h5>

          {
            Last5IncidentsData.map(incident => {
              return (
                <Incident incident={incident} />
              )
            })
          }

          {/* {
            Last5IncidentsData.map(incident => {
              return (
                <Incident key={incident.Id} incident={incident} />)
            })
          } */}

        </div>
      </div>
    );
}

const Incident = ({incident}) => {
    return (
      <div className="incident">
        <span className="timestamp"> 6 minutes ago</span>
        <div className="title">
          <a >
            {incident.Title}
          </a>
        </div>
        <span className="status">
          New
        </span>
      </div>

    );
}

const mapStateToProps = (state) => {        
  return{   
      userId :state.userLogin.userId,  // logged in User Id  
      Last5IncidentsData: state.dashboard.Last5IncidentsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getLast5IncidentsData: () => dispatch(GetLast5Incidents()),     
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LastFive);
