import { React, useEffect, useState, useRef } from "react";
import PageActions from "../../PageActions";
import M from "materialize-css";
import { connect } from "react-redux";
import { allUsers } from "../../../store/actions/usersActions";
import { getIncidentById, updateIncident, deleteAttachment } from "../../../store/actions/incidentsActions";
import Comments from "./Comments";
import  AssigneeDropdown  from "../AssigneeDropdown";
import "../../../styles/incidentDetails.css";
import moment from "moment";
import { incidentsUrls } from "../../../api/apiURLs";
import IncidentTitle from "./IncidentTitle";
import IncidentDescription from "./IncidentDescription";

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

  const [assignee, setAssignee] = useState(null);
  const [status, setStatus] = useState('N');
  const [dueDate, setDueDate] = useState('');
  const [startTime, setStartTime] = useState('');
  
  const [assigneeName, setAssigneeName] = useState("");  


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
     
              <div className="preloader-wrapper container big active page-loader">
                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div><div className="gap-patch">
                    <div className="circle"></div>
                  </div><div className="circle-clipper right">
                    <div className="circle"></div>
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
            <IncidentTitle getNameById={getNameById} />
             <div className="row">
                <div className="col s12 l6">
              <IncidentDescription type="description" />
              <IncidentDescription type="additionaldata" />
                  
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
                            <option value="N" disabled >
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
                              <label htmlFor="dueDateDate" className="">
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
                              <label htmlFor="dueDateTime" className="">
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
                              <label htmlFor="startTimeDate" className="">
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
                              <label htmlFor="startTimeime" className="">
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
