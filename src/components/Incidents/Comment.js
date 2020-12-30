import React from 'react'

export default function Comment({comment}) {
   
    return (
      <>
         <h4 className="left-align">Comments</h4>
                  <div className="card">
                    <div className="card-content">
                      <div className="row">
                        <div className="col s12">
                          <p className="commentHeader">
                            <a>Umar Shareef</a> added a comment. - 7 days ago
                            <span className="right">
                              <i
                                title="Edit Comment"
                                className="actions-icon material-icons indigo-text darken-4"
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
                          <p className="darkslategrayText">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Maiores tempora quibusdam cum iure alias
                            fugiat. Qui ipsum labore fuga recusandae quo est
                            aliquid sunt repellendus soluta odio, consequatur
                            inventore animi!
                          </p>
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
                          >
                            <i className="actions-icon material-icons">check</i>
                          </button>
                          <button
                            title="Cancel"
                            className="btn yellow darken-2 right updateBtn"
                          >
                            <i className="actions-icon material-icons">
                              cancel
                            </i>
                          </button>

                          <br />
                          <p>
                            <ul className="commentFiles">
                              <li>                                
                                <a className="center indigo-text darken-4">
                                  <i
                                    title="Remove"
                                    className="actions-icon material-icons red-text inline-icon"
                                  >
                                    cancel
                                  </i>
                                  File 1
                                </a>
                              </li>
                              <li>                               
                                <a className="center indigo-text darken-4">
                                  File 2
                                </a>
                              </li>
                              <li>                                
                                <a className="center indigo-text darken-4">
                                  File 3
                                </a>
                              </li>
                            </ul>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                 <h5 className="left-align">Add Comment</h5>
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
              
                      <button className="btn green darken-2 updateBtn">
                          <span>Add</span>
                          <i className="material-icons right">save</i>
                         
                        </button>
          
                      <button className="btn yellow darken-2 updateBtn ">
                        <span>Cancel</span>
                        <i className="material-icons right">cancel</i>
                        
                      </button>
                    </div>
            </>
    );
}
