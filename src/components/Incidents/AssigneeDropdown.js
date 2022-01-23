import { React, useEffect, useState, useRef } from "react";
import {  updateIncident, deleteAttachment } from "../../store/actions/incidentsActions";
import M from "materialize-css";
import { connect } from "react-redux";
import { allUsers } from "../../store/actions/usersActions";
import { v4 as uuidv4 } from 'uuid';

function AssigneeDropdown({getAllAssignees, allAssignees, updateIncidentByField, setAssignee ,assigneeName, setAssigneeName }) {

    const [assigneeList, setAssigneeList] = useState(allAssignees);
    const [assgineeSearchText, setAssgineeSearchText] = useState("");
    const assigneeRef = useRef();

    const dropDownId = "dropdownAssginee" + uuidv4();

    useEffect(() => {       
        getAllAssignees();
      }, []); // get assignee on first render only
    
    useEffect(() => {
        setAssigneeList(allAssignees);
      }, [allAssignees]);

      useEffect(() => {
        setMaterializeCSS();
      }, [allAssignees]);

      
  const setMaterializeCSS = () => {
    var options = {
      closeOnClick: false,
    };
    M.Dropdown.init(assigneeRef.current, options);   
  }

  const assigneeSelected = (event, userId) => {
    event.preventDefault();
    let currentAssignee = allAssignees.find((assignee) => {
      return assignee.Id === userId;
    });

    setAssignee(userId);
    setAssigneeName(currentAssignee.FirstName + " " + currentAssignee.LastName);
    if(updateIncidentByField)
         updateIncidentByField("AssignedTo" , userId); 

    var assigneeDropdown = M.Dropdown.getInstance(assigneeRef.current);
    assigneeDropdown.close();
  };

  const searchAssignee = (event) => {
    event.preventDefault();
    console.log("searching....");
    setAssgineeSearchText(event.target.value);
    console.log("assgineeSearchText", assgineeSearchText);
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


  if (allAssignees && !assigneeList) {
    setAssigneeList(allAssignees);
  }


    return (
        <>
             <input
                            readOnly
                            required
                            type="text"
                            className="dropdown-trigger  align-right"
                            id="assignee"
                            data-target={dropDownId}
                            placeholder="Select User"
                            ref={assigneeRef}
                            value={assigneeName}
                          
                          />

                          <ul id={dropDownId} className="dropdown-content">
                            <li className="search-assignee-box">
                              <input
                              // onClick={()=> alert("clicker")}
                            //   onKeyDown={(e)=> console.log(e.target.value)}
                               // value={assgineeSearchText}
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
                                      onClick={(event) => assigneeSelected(event,user.Id)}
                                    >
                                      <a className="indigo-text" href="#!">
                                        {user.FirstName + " " + user.LastName}
                                      </a>
                                    </li>
                                  );
                                })}
                          </ul>
        </>
    )
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
      updateIncident: (parameters) => dispatch(updateIncident(parameters)),   
        
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AssigneeDropdown);