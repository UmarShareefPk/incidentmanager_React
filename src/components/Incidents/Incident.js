import React from 'react';
import {  useHistory  } from 'react-router-dom';
import { removeIncidentData } from "../../store/actions/incidentsActions";
import { connect  } from 'react-redux';
import '../../styles/IncidentListing.css';
import moment from "moment";;

function Incident({incident, dispatch, getUserNameById}) {

  const history = useHistory();

  const openIncident = (id) => {  
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

  const dateDifference = (date1 , date2) =>{
   
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
     // console.log(diffTime + " milliseconds");
     // console.log(diffDays + " days");
     return diffDays;
  }

  let currentDate = new Date();
  const dueDateClass = (new Date(incident.DueDate)) < currentDate ? "red-text text-darken-2" : "green-text text-darken-2";
  
    return (
      <tr >
        
        <td
          className="tbl-title"
          title={incident.Title}
        >
         <span className="indigo-text darken-4" onClick = { () => openIncident(incident.Id) }>
               {incident.Title.length > 50 ? incident.Title.slice(0,50) + " ..." : incident.Title }
         </span>
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
        <td><span className={dueDateClass} title= {moment(incident.DueDate).format("MMMM DD YYYY, h:mm:ss a")}>{moment(incident.DueDate).fromNow() } </span></td>
        <td>{statusName(incident.Status)}</td>
      </tr>
    );
}

export default connect()(Incident);