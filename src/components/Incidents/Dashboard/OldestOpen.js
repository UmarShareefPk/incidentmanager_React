import React ,{useEffect, useState} from 'react'
import { connect } from 'react-redux';
import { GetOldest5UnresolvedIncidents } from '../../../store/actions/dashboardActions';
import moment from "moment";
import {  useHistory  } from 'react-router-dom';

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
      Oldest5UnresolvedIncidents: state.dashboard.Oldest5UnresolvedIncidentsData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOldest5UnresolvedIncidents: () => dispatch(GetOldest5UnresolvedIncidents()),     
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FiveOldestOpenIncidents);
