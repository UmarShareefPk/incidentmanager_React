import React ,{useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { GetLast5Incidents } from '../../../store/actions/dashboardActions';
import moment from "moment";

import {  useHistory  } from 'react-router-dom';

function LastFive({Last5IncidentsData, getLast5IncidentsData, dispatch}) {

  useEffect(() => {
    getLast5IncidentsData();
}, [])


if(Last5IncidentsData == null || Last5IncidentsData.length===0 )
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
        </div>
      </div>
    );
}

const Incident = ({incident, dispatch}) => {

  const statusName = (status) => {
    switch(status){
      case "N":
        return "New";
      case "C":
        return "Close";
      case "A":
        return "Approved";
      case "I":
        return "In Progress";
      default:
        return status;
    }
  }

  const history = useHistory();
  const openIncident = (id) => {  
  //  dispatch(removeIncidentData()); // So that user does not see old data that is stored in redux (and local storage)
    let path = '/Incident/' + id;      
      history.push(path);
  }

    return (
      <div className="incident">
        <div className="time-status">
        <span className="timestamp"
          title={moment(incident.CreatedAT).format("MMMM DD YYYY, h:mm:ss a")}
        >
          {moment(incident.CreatedAT).fromNow()}{" "}
        </span>
         
          <span className="status">
            {statusName(incident.Status)}
          </span>
        </div>

        <div className="title">
          <a onClick={()=> openIncident(incident.Id)} >
            {incident.Title}
          </a>
        </div>

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
