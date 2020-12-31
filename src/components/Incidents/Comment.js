import { React, useEffect, useState, useRef } from "react";
import moment from "moment";

console.log(moment);
export default function Comment({comment}) {

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
   
    return (
      <>
         <h5 className="heading left-align">Comments</h5>
                  <div className="card">
                    <div className="card-content">
                      <div className="row">
                        <div className="col s12">
                          <p className="commentHeader">
                             <a>Umar Shareef</a> added a comment. - {moment("Fri Jun 01 2021 02:45:49").fromNow() } {moment("Fri Jun 01 2021 02:45:49").format("MMMM DD YYYY, h:mm:ss a")}
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
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Maiores tempora quibusdam cum iure alias
                              fugiat. Qui ipsum labore fuga recusandae quo est
                              aliquid sunt repellendus soluta odio, consequatur
                              inventore animi!
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
                  </div>
                 <h6 className="heading indigo-text darken-4 left-align">Add Comment</h6>
                    <div className="input-field"> 
                       <textarea id="comment" className="materialize-textarea"></textarea> 
                       <label for="comment" className="">Comment</label>                    
                    </div>
                    <div className="file-field input-field">
                      <div className="btn indigo darken-2">
                        <i className="material-icons ">attachment</i>
                        <input type="file" id="attachment" multiple />
                      </div>
                      <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" placeholder="Upload upto 3 files" />
                      </div>
                    </div>

                    <div className="input-field center ">         
              
                      <button className="left btn green darken-2 updateBtn">
                          <span>Add</span>
                          <i className="material-icons right">save</i>
                         
                        </button>
          
                      <button className="btn hide yellow darken-2 updateBtn ">
                        <span>Cancel</span>
                        <i className="material-icons right">cancel</i>
                        
                      </button>
                    </div>
            </>
    );
}
