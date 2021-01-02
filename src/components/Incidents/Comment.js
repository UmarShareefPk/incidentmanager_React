import { React, useEffect, useState, useRef } from "react";
import moment from "moment";

export default function Comment({incidentId , comments, saveNewComment, userId , getNameById}) {

  const [comment, setComment] = useState("");
  const [files, setFiles] = useState(null);
  const [editComment, setEditComment] = useState(false);


  const onFileChange = (event) => {    
    if (event.target.files.length > 3) {
      //alert("You can only attach upto 3 files. All extra files will be ignored.");
    }     
    setFiles(event.target.files);
  };

  const saveComment = () => {
    if(comment.trim() === ""){
      alert("Please add comment first.");
      return;
    }
    const formData = new FormData(); 

    if(files){
        for(let i = 0; i < files.length ; i++){
          formData.append( 
            "Attachment" + i+1, 
            files[i], 
            files[i].name 
          );
        }
    }   
     formData.append("CommentText", comment.trim()); 
     formData.append("IncidentId", incidentId);
     formData.append("UserId", userId);


     saveNewComment(formData);
  }

  const commentEditClick = () =>{
    setEditComment(!editComment);
  }
  const commentEditCancel = () =>{
    setEditComment(false);
  }

  const commentEditSave = () =>{
    setEditComment(false);
  }
   
    return (
      <>
         <h5 className="heading left-align">Comments</h5>
         {!comments? (<h1>No Comments</h1>) : comments.map(comment =>{
           return (
            <div className="card">
                    <div className="card-content">
                      <div className="row">
                        <div className="col s12">
                          <p className="commentHeader">
                             <a>{getNameById(comment.UserId)}</a> added a comment. - <span title= {moment("comment.CreateDate").format("MMMM DD YYYY, h:mm:ss a")}>{moment(comment.CreateDate).fromNow() } </span> 
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
                            <>
                                <textarea className="materialize-textarea">
                                Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Culpa quibusdam maiores totam, saepe ipsa
                                necessitatibus magni! Molestias beatae, asperiores,
                                tempore maiores odio sunt sit quasi veritatis
                                architecto incidunt at ipsum.
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
                           </>
                          )
                          }
                          <br />
                          <p>
                            <ul className="commentFiles">
                              <li>                                
                                <a className="center indigo-text darken-4">
                                {!editComment ? null : 
                                    <i
                                      title="Remove"
                                      className="actions-icon material-icons red-text inline-icon" >
                                      cancel
                                    </i>
                                }
                                  [File Name]
                                </a>
                              </li>                              
                            </ul>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>           )
         })}
                
                
                 <h6 className="heading indigo-text darken-4 left-align">Add Comment</h6>
                    <div className="input-field"> 
                       <textarea id="comment" className="materialize-textarea" value={comment} onChange= {(e)=>setComment(e.target.value)}></textarea> 
                       <label for="comment" className="">Comment</label>                    
                    </div>
                    <div className="file-field input-field">
                      <div className="btn indigo darken-2">
                        <i className="material-icons ">attachment</i>
                        <input type="file" id="attachment" multiple   onChange={onFileChange} />
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload upto 3 files" />
                      </div>
                    </div>

                    <div className="input-field center ">         
              
                      <button className="left btn green darken-2 updateBtn" onClick={saveComment}>
                          <span>Add</span>
                          <i className="material-icons right">save</i>
                          
                        </button>
          
                     
                    </div>
            </>
    );
}
