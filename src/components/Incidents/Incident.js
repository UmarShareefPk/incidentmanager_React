import React from 'react';
import {  useHistory  } from 'react-router-dom';

export default function Incident({incident}) {

  const history = useHistory();

  const openIncident = (id) => {
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
