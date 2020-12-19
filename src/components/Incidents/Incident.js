import React from 'react'

export default function Incident({incident}) {
    
    return (
      <tr>
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
