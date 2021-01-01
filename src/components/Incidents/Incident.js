import React from 'react';
import {  useHistory  } from 'react-router-dom';
import { removeIncidentData } from "../../store/actions/incidentsActions";
import { connect  } from 'react-redux'

function Incident({incident, dispatch}) {

  const history = useHistory();

  const openIncident = (id) => {
    console.log(removeIncidentData());
    dispatch(removeIncidentData()); // So that user does not see old data that is stored in redux (and local storage)
    let path = '/Incident/' + id;      
      history.push(path);
  }
    
    return (
      <tr onClick = { () => openIncident(incident.Id) }>
        <td>{incident.Title}</td>
        <td
          className="description"
          title={incident.Description}
        >
          {incident.Description}
        </td>
        <td>{incident.AssignedTo}</td>
        <td>{incident.CreatedBy}</td>
        <td>{incident.CreatedAT}</td>
        <td>{incident.DueDate}</td> 
        <td>{incident.Status}</td>
      </tr>
    );
}

export default connect()(Incident);