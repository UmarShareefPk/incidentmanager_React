import { React, useEffect, useState, useRef } from "react";
import PageActions from "../PageActions";
import M from "materialize-css";
import { connect } from "react-redux";
import { allUsers } from "../../store/actions/usersActions";
import { getIncidentById } from "../../store/actions/incidentsActions";
import Comment from "./Comment";
import "../../styles/incidentDetails.css";

function IncidentDetails({
  match,
  incidentData,
  getIncidentById,
  allAssignees,
  getAllAssignees,
}) {
  const [assignee, setAssignee] = useState(null);
  const [assigneeName, setAssigneeName] = useState("");
  const [assigneeList, setAssigneeList] = useState(allAssignees);

  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editAdditionalDetails, setEditAdditionalDetails] = useState(false);
  const [editDueDate, setEditDueDate] = useState(false);
  const [editStartDate, setEditStartDate] = useState(false);
  


  const assigneeRef = useRef();
  const statusRef = useRef();

  useEffect(() => {
    setAssigneeList(allAssignees);
  }, [allAssignees]);

  useEffect(() => {
    var options = {
      closeOnClick: false,
    };
    M.Dropdown.init(assigneeRef.current, options);
    M.FormSelect.init(statusRef.current);
  }, []);

  useEffect(() => {
    getIncidentById(match.params.id);
    getAllAssignees();
  }, []);

  const assigneeSelected = (userId) => {
    let currentAssignee = allAssignees.find((assignee) => {
      return assignee.Id === userId;
    });
    console.log(currentAssignee);
    var assigneeDropdown = M.Dropdown.getInstance(assigneeRef.current);
    assigneeDropdown.close();
    setAssignee(userId);
    setAssigneeName(currentAssignee.FirstName + " " + currentAssignee.LastName);
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
  }
  const titleEditCancel = () =>{
    setEditTitle(false);
  }

  const titleEditSave = () =>{
    setEditTitle(false);
  }


  const descriptionEditClick = () =>{
    setEditDescription(!editDescription);
   
  }
  const descriptionEditCancel = () =>{
    setEditDescription(false);
  }

  const descriptionEditSave = () =>{
    setEditDescription(false);
  }


  const additionalDetailsEditClick = () =>{
    setEditAdditionalDetails(!editAdditionalDetails);
  }
  const additionalDetailsEditCancel = () =>{
    setEditAdditionalDetails(false);
  }

  const additionalDetailsEditSave = () =>{
    setEditAdditionalDetails(false);
  }


  const dueDateEditClick = () =>{
    setEditDueDate(!editDueDate);
  }
  const dueDateEditCancel = () =>{
    setEditDueDate(false);
  }

  const dueDateEditSave = () =>{
   setEditDueDate(false);
  }


  const startDateEditClick = () =>{
    setEditStartDate(!editStartDate);
  }
  const startDateEditCancel = () =>{
    setEditStartDate(false);
  }

  const startDateEditSave = () =>{
   setEditStartDate(false);
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
                        Title will go here
                        <i className="material-icons actions-icon" onClick={titleEditClick}>edit</i>
                        <span className="im-createTime black-text ">
                          2020/12/22 5:00 PM
                        </span>
                      </h5>)
                  :
                        (<div className="input-field"> {/* Title Edit */}
                          <input type="text" />
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
                        <p className="darkslategrayText">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                          Culpa quibusdam maiores totam, saepe ipsa necessitatibus
                          magni! Molestias beatae, asperiores, tempore maiores odio
                          sunt sit quasi veritatis architecto incidunt at ipsum.
                        </p>
                      </div>
                    </>
                  )
                :
                    ( 
                      <>
                        <div className="input-field"> {/* Description Edit */}
                          <textarea id="description" className="materialize-textarea">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Culpa quibusdam maiores totam, saepe ipsa necessitatibus
                            magni! Molestias beatae, asperiores, tempore maiores odio
                            sunt sit quasi veritatis architecto incidunt at ipsum.
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
                            <p className="darkslategrayText">
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                              Culpa quibusdam maiores totam, saepe ipsa necessitatibus
                              magni! Molestias beatae, asperiores, tempore maiores odio
                              sunt sit quasi veritatis architecto incidunt at ipsum.
                            </p>
                          </div>)
                  :
                      (  <div className="input-field">   {/*   Additional Details Edit */}
                          <textarea className="materialize-textarea">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                          Culpa quibusdam maiores totam, saepe ipsa necessitatibus
                          magni! Molestias beatae, asperiores, tempore maiores odio
                          sunt sit quasi veritatis architecto incidunt at ipsum.
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
                          <h7 className="heading left indigo-text darken-4">
                            Assignee{" "}
                          </h7>
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
                          <h7 className="heading left indigo-text darken-4">Status </h7>
                        </td>
                        <td>
                          <select ref={statusRef}>
                            <option defaultValue="" disabled selected>
                              Choose your option
                            </option>
                            <option defaultValue="I">In Progress</option>
                            <option defaultValue="C">Closed</option>
                            <option defaultValue="A">Approved</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h7 className="heading left indigo-text darken-4">
                            Due Date
                            <i className="actions-icon inline-icon material-icons" onClick={dueDateEditClick}>edit</i>
                          </h7>
                        </td>
                        <td>
                        {!editDueDate ? 
                          (   <p>
                               
                                March 22, 2020{" "}
                              </p>)
                          :
                          (    <div className="">
                                <div className="input-field ">
                                  <input
                                    type="text"
                                    id="dueDateDate"
                                    className="datepicker"
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
                              </div>)
                        }
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h7 className="heading left indigo-text darken-4">                            
                               Start Time
                            <i className="actions-icon inline-icon material-icons"   onClick={startDateEditClick}>edit</i>
                          </h7>
                        </td>
                        <td>
                        {!editStartDate ? 
                          (  <p >
                             
                              March 22, 2020
                            </p>)
                          :
                           (  <div className="">
                              <div className="input-field">
                                <input
                                  type="text"
                                  id="startTimeDate"
                                  className="datepicker"
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
                            </div>)
                        }
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAssignees: () => dispatch(allUsers()),
    getIncidentById: (incidentId) => dispatch(getIncidentById(incidentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncidentDetails);
