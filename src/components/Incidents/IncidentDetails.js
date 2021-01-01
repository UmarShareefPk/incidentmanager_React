import { React, useEffect, useState, useRef } from "react";
import PageActions from "../PageActions";
import M from "materialize-css";
import { connect } from "react-redux";
import { allUsers } from "../../store/actions/usersActions";
import { getIncidentById, updateIncident } from "../../store/actions/incidentsActions";
import Comment from "./Comment";
import "../../styles/incidentDetails.css";
import moment from "moment";

function IncidentDetails({
  match,
  incidentData,
  getIncidentById,
  allAssignees,
  getAllAssignees,
  userId,
  updateIncident
}) {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState(""); 
  const [assignee, setAssignee] = useState(null);
  const [status, setStatus] = useState('N');
  
  const [assigneeName, setAssigneeName] = useState("");
  const [assigneeList, setAssigneeList] = useState(allAssignees);

  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editAdditionalDetails, setEditAdditionalDetails] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);
  const [editStartDate, setEditStartDate] = useState(false);

  const assigneeRef = useRef();
  const statusRef = useRef();
  const dueDateTimeRef= useRef();
  const dueDateDateRef= useRef();
  const startTimeTimeRef = useRef();
  const startTimeDateRef = useRef();

  useEffect(() => {
    setAssigneeList(allAssignees);
  }, [allAssignees]);

  useEffect(() => {
    setMaterializeCSS();
  }, [incidentData]);

  useEffect(() => {    
    getIncidentById(match.params.id);
    getAllAssignees();
  }, []);

  useEffect(() => {  // To update Fields
    if(incidentData){
      setTitle(incidentData.Title);
      setDescription(incidentData.Description);
      setAdditionalDetails(incidentData.AdditionalDetails); 
      let currentAssignee =  allAssignees.find((assignee) => {
        return assignee.Id === incidentData.AssignedTo;
      });
      setAssigneeName(currentAssignee.FirstName + " " + currentAssignee.LastName);  
      setStatus(incidentData.Status);
    }
  }, [incidentData]);

  const setMaterializeCSS = () => {
    var options = {
      closeOnClick: false,
    };
    M.Dropdown.init(assigneeRef.current, options);
    M.FormSelect.init(statusRef.current);
    M.Datepicker.init(startTimeDateRef.current);
    M.Timepicker.init(startTimeTimeRef.current);
    M.Datepicker.init(dueDateDateRef.current);
    M.Timepicker.init(dueDateTimeRef.current);
  }


  const assigneeSelected = (userId) => {
    let currentAssignee = allAssignees.find((assignee) => {
      return assignee.Id === userId;
    });

    setAssignee(userId);
    setAssigneeName(currentAssignee.FirstName + " " + currentAssignee.LastName);
    updateIncidentByField("AssignedTo" , userId);
    var assigneeDropdown = M.Dropdown.getInstance(assigneeRef.current);
    assigneeDropdown.close();
  };

  const searchAssignee = (event) => {
    let newList = [];
    if (event.target.value !== "")
      newList = allAssignees.filter((assignee) => {
        return (
          assignee.FirstName.toUpperCase().startsWith(
            event.target.value.toUpperCase()
          ) ||
          assignee.LastName.toUpperCase().startsWith(
            event.target.value.toUpperCase()
          )
        );
      });

    if (newList !== undefined && newList.length !== 0) {
      //check if there is atlease one assignee
      newList = [].concat(newList);
    } else {
      //if search found nothing, show all assignees
      newList = allAssignees.slice(0, allAssignees.length);
    }
    setAssigneeList(newList);
  };

  if (!incidentData || !allAssignees) {
    console.log(incidentData, allAssignees, assigneeList);
    return <h1> Loading</h1>;
  }

  if (allAssignees && !assigneeList) {
    setAssigneeList(allAssignees);
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
   setEditDueDate(false);
  }


  const startDateEditClick = () =>{
    setEditStartDate(!editStartDate);
    setMaterializeCSS();
  }
  const startDateEditCancel = () =>{
    setEditStartDate(false);
  }

  const startDateEditSave = () =>{
   setEditStartDate(false);
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
                 {!editTitle ? 
                      (<h5 className="left indigo-text darken-4">  {/* Title  */}                 
                        {incidentData.Title}
                        <i className="material-icons actions-icon" onClick={titleEditClick}>edit</i>
                        <span className="im-createTime black-text " title={moment(incidentData.CreatedAT).format("MMMM DD YYYY, h:mm:ss a")}>
                          {moment(incidentData.CreatedAT).fromNow()}                         
                        </span>
                      </h5>)
                  :
                        (<div className="input-field"> {/* Title Edit */}
                          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                     )
                 }
                 </div>
                <div className="col s3"> {/* IM Major Action Edit */}
                  <h5 className="left indigo-text darken-4"> </h5>
                </div>
              </div>

              <div className="row">
                <div className="col s12 l6">

                  <p className="heading left-align indigo-text darken-4"> {/* Description  */}
                          Description :
                          <i className="inline-icon material-icons actions-icon" onClick={descriptionEditClick}>
                            edit
                          </i>
                  </p>        
                {!editDescription ?
                  ( <>                               
                      <div className="input-field">
                        <p className="darkslategrayText bigTextScroll">
                         {incidentData.Description}
                        </p>
                      </div>
                    </>
                  )
                :
                    ( 
                      <>
                        <div className="input-field"> {/* Description Edit */}
                          <textarea id="description" className="materialize-textarea" value={description} onChange={(e) => setDescription(e.target.value)}  >
                           
                          </textarea>
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
                  )
                }
                  <p className="heading left-align indigo-text darken-4"> {/*   Additional Details */}
                    Additional Details :
                    <i className="inline-icon material-icons" onClick={additionalDetailsEditClick}>edit</i>
                  </p>
                  {!editAdditionalDetails ? 
                      (     <div className="input-field">
                            <p className="darkslategrayText bigTextScroll">
                               {incidentData.AdditionalData}
                            </p>
                          </div>)
                  :
                      (  <div className="input-field">   {/*   Additional Details Edit */}
                          <textarea className="materialize-textarea" value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)} >

                          </textarea>
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
                      </div>) 
                  }
                  <p className="heading left-align indigo-text darken-4"> {/*  Attachments */}
                    <i className="material-icons inline-icon">attachment</i>
                    Attachments:
                  </p>

                  <div className="input-field">
                    <ul className="input-field incidentFiles">
                      <li className="center indigo-text darken-4">
                        <i
                          title="Remove"
                          className="actions-icon material-icons red-text inline-icon"
                        >
                          cancel
                        </i>
                        File 1
                      </li>
                      <li className="center indigo-text darken-4">File 2</li>
                      <li className="center indigo-text darken-4">File 3</li>
                    </ul>
                  </div>

                  <Comment />
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
                          <input
                            readOnly
                            required
                            type="text"
                            className="dropdown-trigger  align-right"
                            id="assignee"
                            data-target="dropdown1"
                            placeholder=""
                            ref={assigneeRef}
                            value={assigneeName}
                          />

                          <ul id="dropdown1" className="dropdown-content">
                            <li>
                              <input
                                type="text"
                                placeholder="Search Assignee"
                                onChange={searchAssignee}
                              />
                            </li>
                            {!assigneeList
                              ? null
                              : assigneeList.map((user) => {
                                  return (
                                    <li
                                      key={user.Id}
                                      onClick={() => assigneeSelected(user.Id)}
                                    >
                                      <a className="indigo-text" href="#!">                                       
                                        {user.FirstName +
                                          " " +
                                          user.LastName}
                                      </a>
                                    </li>
                                  );
                                })}
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="heading left indigo-text darken-4">Status </p>
                        </td>
                        <td>
                          <select ref={statusRef} value={status} onChange={statusChanged}>
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
                            <i className="actions-icon inline-icon material-icons" onClick={dueDateEditClick}>edit</i>
                          </p>
                        </td>
                        <td>
                        {!editDueDate ? 
                          (   <p title={moment(incidentData.DueDate).format("MMMM DD YYYY, h:mm a")}>
                                  {moment(incidentData.DueDate).fromNow()} 
                              </p>)
                          : null }
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
                            <i className="actions-icon inline-icon material-icons"   onClick={startDateEditClick}>edit</i>
                          </p>
                        </td>
                        <td>
                        {!editStartDate ? 
                          ( <p title={moment(incidentData.StartTime).format("MMMM DD YYYY, h:mm a")}>
                                  {moment(incidentData.StartTime).fromNow()} 
                              </p>)
                          : null }
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAssignees: () => dispatch(allUsers()),
    getIncidentById: (incidentId) => dispatch(getIncidentById(incidentId)), 
    updateIncident: (parameters) => dispatch(updateIncident(parameters)), 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncidentDetails);
