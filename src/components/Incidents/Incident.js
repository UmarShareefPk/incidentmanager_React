import React from 'react';
import {  useHistory  } from 'react-router-dom';
import { removeIncidentData } from "../../store/actions/incidentsActions";
import { connect  } from 'react-redux';
import '../../styles/IncidentListing.css';
import moment from "moment";;

function Incident({incident, dispatch, getUserNameById}) {

  const history = useHistory();

  const openIncident = (id) => {
    console.log(removeIncidentData());
    dispatch(removeIncidentData()); // So that user does not see old data that is stored in redux (and local storage)
    let path = '/Incident/' + id;      
      history.push(path);
  }

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
    
    return (
      <tr onClick = { () => openIncident(incident.Id) }>
        
        <td
          className="tbl-title"
          title={incident.Title}
        >
          {incident.Title.length > 50 ? incident.Title.slice(0,50) + " ..." : incident.Title }
        </td>
        <td
          className="tbl-description"
          title={incident.Description}
        >
          {incident.Description.length > 30 ? incident.Description.slice(0,30) + " ..." : incident.Description }
        </td>
        <td>{getUserNameById(incident.AssignedTo)}</td>
        <td>{getUserNameById(incident.CreatedBy)}</td>
        <td><span title= {moment(incident.CreatedAT).format("MMMM DD YYYY, h:mm:ss a")}>{moment(incident.CreatedAT).fromNow() } </span></td>
        <td><span title= {moment(incident.DueDate).format("MMMM DD YYYY, h:mm:ss a")}>{moment(incident.DueDate).fromNow() } </span></td>
        <td>{statusName(incident.Status)}</td>
      </tr>
    );
}

export default connect()(Incident);