import React from 'react'

export default function Incident({incident}) {
    
    return (
      <tr>
        <td>{incident.Title}</td>
        <td
          className="description"
          title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque perferendis ipsum repudiandae nulla sequi culpa! Sint nulla fugit quidem tenetur magni corrupti expedita magnam vitae, at totam voluptatum iusto aliquam."
        >
          {incident.Description}
        </td>
        <td>{incident.AssignedTo}</td>
        <td>{incident.CreatedBy}</td>
        <td>{incident.CreatedAT}</td>
        <td>{incident.CreatedAT}</td> 
        <td>Open</td>
      </tr>
    );
}
