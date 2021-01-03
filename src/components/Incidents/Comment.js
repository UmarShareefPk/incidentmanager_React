import { React, useEffect, useState, useRef } from "react";
import moment from "moment";

export default function Comment({comment,getNameById, incidentId}) {

    const [editComment, setEditComment] = useState(false);

    const commentEditClick = () =>{
        setEditComment(!editComment);
      }
      const commentEditCancel = () =>{
        setEditComment(false);
      }
    
      const commentEditSave = () =>{
        setEditComment(false);
      }

   const downloadFile = (file) => {
         console.log(file);
         window.open(
             "https://localhost:44398/api/Incidents/DownloadFile?type=comment"
                + "&commentId=" + file.CommentId 
                + "&incidentId=" + incidentId
                + "&filename=" + file.FileName
                + "&contentType=" + file.ContentType
         ); 
       }
    console.log(comment.CreateDate);
    return (
        <div className="">
        <p className="commentHeader">
           <a>{getNameById(comment.UserId)}</a> added a comment. - <span title= {moment(comment.CreateDate).format("MMMM DD YYYY, h:mm:ss a")}>{moment(comment.CreateDate).fromNow() } </span> 
          <span className="right">
            <i
              title="Edit Comment"
              className="actions-icon material-icons indigo-text darken-4"
              onClick = {commentEditClick}
            >
              edit
            </i>
            <i
              title="Delete Comment"
              className="actions-icon material-icons red-text"
            >
              cancel
            </i>
          </span>
        </p>
        {!editComment ? 
        (  <p className="darkslategrayText">
                {comment.CommentText}
          </p>)
        :
        (
          <p className="comment-edit-box">
              <textarea className="materialize-textarea">                               
              </textarea>
            <button
              title="Save"
              className="btn green darken-2 right updateBtn"
              onClick = {commentEditSave}
            >
              <i className="actions-icon material-icons">check</i>
            </button>
            <button
              title="Cancel"
              className="btn yellow darken-2 right updateBtn"
              onClick = {commentEditCancel}
            >
              <i className="actions-icon material-icons">
                cancel
              </i>
            </button> 
         </p>
        )
        
        } {/* end of edit comment - if */}
       
        <p>
          <ul className="commentFiles">
            {!comment.attachments? null : comment.attachments.map(file => {
              return (
                <li key={file.Id}>                                
                  <a className="center indigo-text darken-4">
                      {!editComment ? null : 
                          <i
                            title="Remove"
                            className="actions-icon material-icons red-text inline-icon" >
                            cancel
                          </i>
                      }
                       <span title={ file.FileName } onClick={() => downloadFile(file)}> 
                                {file.FileName.length > 12 ? file.FileName.slice(0,12) + "..." :  file.FileName } 
                       </span>
                  </a>
             </li>      
              )                               

            }) }
                              
          </ul>
        </p>
        <hr></hr>
      </div>
    )
}
