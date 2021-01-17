import { React, useEffect, useState, useRef } from "react";
import PageActions from "../PageActions";
import M from "materialize-css";
import { connect } from "react-redux";
import { allUsers } from "../../store/actions/usersActions";
import { getIncidentById, updateIncident, deleteAttachment } from "../../store/actions/incidentsActions";
import Comments from "./Comments";
import  AssigneeDropdown  from "./AssigneeDropdown";
import "../../styles/incidentDetails.css";
import moment from "moment";
import { incidentsUrls } from "../../api/apiURLs";

function IncidentDetails({
  match,
  incidentData,
  getIncidentById,
  allAssignees,
  getAllAssignees,
  userId,
  updateIncident,
  deleteAttachment,
  IncidentDetailError
  
}) {
 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState(""); 
  const [assignee, setAssignee] = useState(null);
  const [status, setStatus] = useState('N');
  const [dueDate, setDueDate] = useState('');
  const [startTime, setStartTime] = useState('');
  
  const [assigneeName, setAssigneeName] = useState("");  

  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editAdditionalDetails, setEditAdditionalDetails] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);
  const [editStartDate, setEditStartDate] = useState(false);
  
  const statusRef = useRef();
  const dueDateTimeRef= useRef();
  const dueDateDateRef= useRef();
  const startTimeTimeRef = useRef();
  const startTimeDateRef = useRef();

  useEffect(() => {
    setMaterializeCSS();
  }, [incidentData]);

  useEffect(() => {    
    getIncidentById(match.params.id);   
  }, [match.params.id]); // whenever Id changes get new

  useEffect(() => {  // To update Fields
    if(incidentData){
      setTitle(incidentData.Title);
      setDescription(incidentData.Description);
      setAdditionalDetails(incidentData.AdditionalData); 
      let currentAssignee =  allAssignees.find((assignee) => {
        return assignee.Id === incidentData.AssignedTo;
      });
      setAssigneeName(currentAssignee.FirstName + " " + currentAssignee.LastName);  
      setStatus(incidentData.Status);
      setDueDate(incidentData.DueDate);
      setStartTime(incidentData.StartTime);
    }
  }, [incidentData]);

  const setMaterializeCSS = () => { 
    M.FormSelect.init(statusRef.current);
    M.Datepicker.init(startTimeDateRef.current);
    M.Timepicker.init(startTimeTimeRef.current);
    M.Datepicker.init(dueDateDateRef.current);
    M.Timepicker.init(dueDateTimeRef.current);
  }

  const getNameById = (id) => {   
    let user = allAssignees.find((assignee) => {
      return assignee.Id === id;
    });   
    if(!user){    
      return id;
    }
    return user.FirstName + " " + user.LastName
  }
 
  const downloadFile = (file) => {
    console.log(file);
    window.open(
          incidentsUrls.downloadFileUrl
           + "type=incident"
           + "&commentId=" + "" 
           + "&incidentId=" + incidentData.Id
           + "&filename=" + file.FileName
           + "&contentType=" + file.ContentType
    ); 
  }

  const titleEditClick = () =>{
    setEditTitle(!editTitle);
    setTitle(incidentData.Title);
  }
  const titleEditCancel = () =>{
    setTitle(incidentData.Title);
    setEditTitle(false);
  }

  const titleEditSave = () =>{
    if(title.trim() === ""){
      alert("Title cannot be empty.");
      setTitle(incidentData.Title);
      return;
    }
    updateIncidentByField("Title" , title.trim());
    setEditTitle(false);
  }

  const descriptionEditClick = () =>{
    setEditDescription(!editDescription);
    setDescription(incidentData.Description);
   
  }
  const descriptionEditCancel = () =>{
    setDescription(incidentData.Description);
    setEditDescription(false);
  }

  const descriptionEditSave = () =>{
    if(description.trim() === ""){
      alert("Description cannot be empty.");
      setDescription(incidentData.Description);
      return;
    }
    updateIncidentByField("Description" , description.trim());
    setEditDescription(false);
  }

  const additionalDetailsEditClick = () =>{
    setEditAdditionalDetails(!editAdditionalDetails);
    setAdditionalDetails(incidentData.AdditionalData);
  }
  const additionalDetailsEditCancel = () =>{
    setAdditionalDetails(incidentData.AdditionalData);
    setEditAdditionalDetails(false);
  }

  const additionalDetailsEditSave = () =>{
    updateIncidentByField("AdditionalData" , additionalDetails.trim());
    setEditAdditionalDetails(false);    
  }

  const dueDateEditClick = () =>{
    setEditDueDate(!editDueDate);
    setMaterializeCSS();
  }
  const dueDateEditCancel = () =>{
    setEditDueDate(false);
  }

  const dueDateEditSave = () =>{    
    if ( dueDateDateRef.current.value === "" ||  dueDateTimeRef.current.value === "" ) {
      alert("Please select date and time.");
      setEditDueDate(false);
      return;
    } 

    let dueDateTemp  = new Date( dueDateDateRef.current.value + " " + dueDateTimeRef.current.value);
    dueDateTemp = (dueDateTemp.getMonth() + 1) + "/" + dueDateTemp.getDate() + "/" +  dueDateTemp.getFullYear() 
                + " " + dueDateTemp.getHours() + ":" + dueDateTemp.getMinutes() + ":" + dueDateTemp.getSeconds(); 
      updateIncidentByField("DueDate" , dueDateTemp);     
      setEditDueDate(false);
      setDueDate(dueDateTemp);
   }

  const startDateEditClick = () =>{
    setEditStartDate(!editStartDate);
    setMaterializeCSS();
  }
  const startDateEditCancel = () =>{
    setEditStartDate(false);
  }

  const startDateEditSave = () =>{
  
   if ( startTimeDateRef.current.value === "" ||  startTimeTimeRef.current.value === "" ) {
    alert("Please select date and time.");
    setEditStartDate(false);
    return;
  } 

  let startTimeTemp  = new Date( startTimeDateRef.current.value + " " + startTimeTimeRef.current.value);
  startTimeTemp = (startTimeTemp.getMonth() + 1) + "/" + startTimeTemp.getDate() + "/" +  startTimeTemp.getFullYear() 
                + " " + startTimeTemp.getHours() + ":" + startTimeTemp.getMinutes() + ":" + startTimeTemp.getSeconds();  
    updateIncidentByField("StartTime" , startTimeTemp);   
    setEditStartDate(false); 
    setStartTime(startTimeTemp);  
  }

  const updateIncidentByField = (field , value) => {    
    let parameters = {
      IncidentId : incidentData.Id,
      Parameter : field,
      Value : value,
      UserId : userId
    };
    updateIncident(parameters); // Calling action here
  }

  const statusChanged = (e) => {
    setStatus(e.target.value);
    updateIncidentByField("Status" , e.target.value);
  }

  const deleteIncidentAttachment = (file) => {        
    if(window.confirm("Are you sure you want to delete this attachment." + file.FileName)){
      deleteAttachment("incicent" , userId, incidentData.Id , file);
    }      
   }

   if(IncidentDetailError !== ""){
    return (
      <div className="container">
        <h1 className="center red-text">Error</h1>
        <h5 className="center">{IncidentDetailError}</h5>
        <p className="center">Please check your network and try loging back.</p>
      </div>
    )
   }

  if (!incidentData || !allAssignees) {    
    return  ( 
     
              <div class="preloader-wrapper container big active page-loader">
                <div class="spinner-layer spinner-blue-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div><div class="gap-patch">
                    <div class="circle"></div>
                  </div><div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
            </div>
          );
  }

  return (
    <>
      <link rel="stylesheet" href="./Styles/incidentDetails.css"></link>
      <PageActions Title={"Incident Details"} />
      <section>
        <div className="container">
          <div className="row">
            <div className="col s12 l12 ">
              <div className="row">
                <div className="col s9">
                  {!editTitle ? (
                    <h5 className="left indigo-text darken-4">
                      {" "}
                      {/* Title  */}
                      {title}
                      <i
                        className="material-icons actions-icon"
                        onClick={titleEditClick}
                      >
                        edit
                      </i>
                    </h5>
                  ) : (
                    <div className="input-field">
                      {" "}
                      {/* Title Edit */}
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <button
                        title="Save"
                        className="btn green darken-2 right updateBtn"
                        onClick={titleEditSave}
                      >
                        <i className="actions-icon material-icons">check</i>
                      </button>
                      <button
                        title="Cancel"
                        className="btn yellow darken-2 right updateBtn"
                        onClick={titleEditCancel}
                      >
                        <i className="actions-icon material-icons">cancel</i>
                      </button>
                    </div>
                  )}
                </div>
                <div className="col s3">
                  {" "}
                  {/* IM Major Action Edit */}
                  <h5>
                    {" "}
                    <span
                      className="im-createTime black-text "
                      title={moment(incidentData.CreatedAT).format(
                        "MMMM DD YYYY, h:mm:ss a"
                      )}
                    >
                      Created by{" "}
                      <a className="username">
                        {" "}
                        {getNameById(incidentData.CreatedBy)}{" "}
                      </a>{" "}
                      - {moment(incidentData.CreatedAT).fromNow()}
                    </span>
                  </h5>
                </div>
              </div>

              <div className="row">
                <div className="col s12 l6">
                  <p className="heading left-align indigo-text darken-4">
                    {" "}
                    {/* Description  */}
                    Description :
                    <i
                      className="inline-icon material-icons actions-icon"
                      onClick={descriptionEditClick}
                    >
                      edit
                    </i>
                  </p>
                  {!editDescription ? (
                    <>
                      <div className="input-field">
                        <p className="darkslategrayText bigTextScroll">
                          {description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="input-field">
                        {" "}
                        {/* Description Edit */}
                        <textarea
                          id="description"
                          className="materialize-textarea"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <button
                          title="Save"
                          className="btn green darken-2 right updateBtn"
                          onClick={descriptionEditSave}
                        >
                          <i className="actions-icon material-icons">check</i>
                        </button>
                        <button
                          title="Cancel"
                          className="btn yellow darken-2 right updateBtn"
                          onClick={descriptionEditCancel}
                        >
                          <i className="actions-icon material-icons">cancel</i>
                        </button>
                      </div>
                    </>
                  )}
                  <p className="heading left-align indigo-text darken-4">
                    {" "}
                    {/*   Additional Details */}
                    Additional Details :
                    <i
                      className="inline-icon material-icons"
                      onClick={additionalDetailsEditClick}
                    >
                      edit
                    </i>
                  </p>
                  {!editAdditionalDetails ? (
                    <div className="input-field">
                      <p className="darkslategrayText bigTextScroll">
                        {additionalDetails}
                      </p>
                    </div>
                  ) : (
                    <div className="input-field">
                      {" "}
                      {/*   Additional Details Edit */}
                      <textarea
                        className="materialize-textarea"
                        value={additionalDetails}
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                      ></textarea>
                      <button
                        title="Save"
                        className="btn green darken-2 right updateBtn"
                        onClick={additionalDetailsEditSave}
                      >
                        <i className="actions-icon material-icons">check</i>
                      </button>
                      <button
                        title="Cancel"
                        className="btn yellow darken-2 right updateBtn"
                        onClick={additionalDetailsEditCancel}
                      >
                        <i className="actions-icon material-icons">cancel</i>
                      </button>
                    </div>
                  )}
                  <p className="heading left-align indigo-text darken-4">
                    {" "}
                    {/*  Attachments */}
                    <i className="material-icons inline-icon">attachment</i>
                    Attachments:
                  </p>

                  <div className="input-field">
                    <ul className="input-field incidentFiles">
                      {!incidentData.Attachments
                        ? null
                        : incidentData.Attachments.map((file) => {
                            return (
                              <li
                                key={file.Id}
                                className="center indigo-text darken-4"
                              >
                                <i
                                  title="Remove"
                                  className="actions-icon material-icons red-text inline-icon"
                                  onClick={() => deleteIncidentAttachment(file)}
                                >
                                  cancel
                                </i>
                                <span
                                  title={file.FileName}
                                  onClick={() => downloadFile(file)}
                                >
                                  {file.FileName.length > 35
                                    ? file.FileName.slice(0, 35) + "..."
                                    : file.FileName}
                                </span>
                              </li>
                            );
                          })}
                    </ul>
                  </div>

                  <Comments
                    userId={userId}
                    incidentId={incidentData.Id}
                    comments={incidentData.Comments}
                    getNameById={getNameById}
                  />
                </div>

                <div className="col s12 l5 offset-l1  ID-dropdowns">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <p className="heading left indigo-text darken-4">
                            Assignee
                          </p>
                        </td>
                        <td>                         
                          <AssigneeDropdown
                            updateIncidentByField={updateIncidentByField}
                            setAssignee={setAssignee}
                            assigneeName = {assigneeName}
                            setAssigneeName = {setAssigneeName}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="heading left indigo-text darken-4">
                            Status{" "}
                          </p>
                        </td>
                        <td>
                          <select
                            ref={statusRef}
                            value={status}
                            onChange={statusChanged}
                          >
                            <option value="N" disabled selected>
                              New
                            </option>
                            <option value="I">In Progress</option>
                            <option value="C">Closed</option>
                            <option value="A">Approved</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="heading left indigo-text darken-4">
                            Due Date
                            <i
                              className="actions-icon inline-icon material-icons"
                              onClick={dueDateEditClick}
                            >
                              edit
                            </i>
                          </p>
                        </td>
                        <td>
                          {!editDueDate ? (
                            <p
                              title={moment(dueDate).format(
                                "MMMM DD YYYY, h:mm a"
                              )}
                            >
                              {moment(dueDate).fromNow()}
                            </p>
                          ) : null}
                          <div className={editDueDate ? "" : "hide"}>
                            <div className="input-field ">
                              <input
                                type="text"
                                id="dueDateDate"
                                className="datepicker"
                                ref={dueDateDateRef}
                              />
                              <label for="dueDateDate" className="">
                                Pick Date
                              </label>
                            </div>
                            <div className="input-field ">
                              <input
                                type="text"
                                id="dueDateTime"
                                className="timepicker"
                                ref={dueDateTimeRef}
                              />
                              <label for="dueDateTime" className="">
                                Pick Time
                              </label>
                            </div>
                            <button
                              title="Save"
                              className="btn green darken-2 right updateBtn"
                              onClick={dueDateEditSave}
                            >
                              <i className="actions-icon material-icons">
                                check
                              </i>
                            </button>
                            <button
                              title="Cancel"
                              className="btn yellow darken-2 right updateBtn"
                              onClick={dueDateEditCancel}
                            >
                              <i className="actions-icon material-icons">
                                cancel
                              </i>
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="heading left indigo-text darken-4">
                            Start Time
                            <i
                              className="actions-icon inline-icon material-icons"
                              onClick={startDateEditClick}
                            >
                              edit
                            </i>
                          </p>
                        </td>
                        <td>
                          {!editStartDate ? (
                            <p
                              title={moment(startTime).format(
                                "MMMM DD YYYY, h:mm a"
                              )}
                            >
                              {moment(startTime).fromNow()}
                            </p>
                          ) : null}
                          <div className={editStartDate ? "" : "hide"}>
                            <div className="input-field">
                              <input
                                type="text"
                                id="startTimeDate"
                                className="datepicker"
                                ref={startTimeDateRef}
                              />
                              <label for="startTimeDate" className="">
                                Pick Date
                              </label>
                            </div>
                            <div className="input-field">
                              <input
                                readOnly
                                type="text"
                                id="startTimeTime"
                                className="timepicker"
                                ref={startTimeTimeRef}
                              />
                              <label for="startTimeime" className="">
                                Pick Time
                              </label>
                            </div>
                            <button
                              title="Save"
                              className="btn green darken-2 right updateBtn"
                              onClick={startDateEditSave}
                            >
                              <i className="actions-icon material-icons">
                                check
                              </i>
                            </button>
                            <button
                              title="Cancel"
                              className="btn yellow darken-2 right updateBtn"
                              onClick={startDateEditCancel}
                            >
                              <i className="actions-icon material-icons">
                                cancel
                              </i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    allAssignees: state.users.users,
    incidentData: state.incidents.IncidentSelected,
    userId :state.userLogin.userId,  // logged in User Id  
    IncidentDetailError : state.incidents.IncidentDetailError     // if api ERROR
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAssignees: () => dispatch(allUsers()),
    getIncidentById: (incidentId) => dispatch(getIncidentById(incidentId)), 
    updateIncident: (parameters) => dispatch(updateIncident(parameters)),   
    deleteAttachment : (type, userid, incidentId , file) => dispatch(deleteAttachment(type, userid, incidentId ,file))    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncidentDetails);
