import React from 'react'

export default function User({user}) {
    
    return (
      <tr>
        <td>{user.FirstName}</td>
        <td>{user.LastName}</td>
        <td>{user.Email}</td>
        <td>{user.CreateDate}</td>  
      </tr>
    );
}
