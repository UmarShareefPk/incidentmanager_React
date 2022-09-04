import React from 'react'
import moment from "moment";
import {setDateTime} from "../../helpers/common"

export default function User({user}) {
    
    return (
      <tr>
        <td>{user.FirstName}</td>
        <td>{user.LastName}</td>
        <td>{user.Email}</td>
        <td>
          
          <span 
          title={moment(setDateTime(user.CreateDate)).format("MMMM DD YYYY, h:mm:ss a")}
        >
           {moment(setDateTime(user.CreateDate)).fromNow()}
          {/* {moment(comment.CreateDate).fromNow()} */}
        </span>  
        </td>  
      </tr>
    );
}
