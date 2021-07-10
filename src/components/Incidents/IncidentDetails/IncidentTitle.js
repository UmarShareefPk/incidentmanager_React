import { React, useEffect, useState, useRef } from "react";
import { updateIncident } from "../../../store/actions/incidentsActions";
import { connect } from "react-redux";
import moment from "moment";

function IncidentTitle({
  incidentData,
  updateIncident,
  userId,
  getNameById,
}) {
  const [title, setTitle] = useState("");
  const [editable, setEditable] = useState(false);

  useEffect(() => {   
    setTitle(incidentData.Title);  
   }, [incidentData])
   

  const editClick = () => {
    setEditable(!editable);
    setTitle(incidentData.Title);
  };
  const editCancel = () => {
    setTitle(incidentData.Title);
    setEditable(false);
  };

  const editSave = () => {
    if (title.trim() === "") {
      alert("Title cannot be empty.");
      setTitle(incidentData.Title);
      return;
    }
    updateIncidentByField("Title", title.trim());
    setEditable(false);
  };

  const updateIncidentByField = (field, value) => {
    let parameters = {
      IncidentId: incidentData.Id,
      Parameter: field,
      Value: value,
      UserId: userId,
    };
    updateIncident(parameters); // Calling action here
  };

  return (
    <div className="row">
      <div className="col s9">
        {!editable ? (
          <h5 className="left indigo-text darken-4">
            {" "}
            {/* Title  */}
            {title}
            <i className="material-icons actions-icon" onClick={editClick}>
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
              onClick={editSave}
            >
              <i className="actions-icon material-icons">check</i>
            </button>
            <button
              title="Cancel"
              className="btn yellow darken-2 right updateBtn"
              onClick={editCancel}
            >
              <i className="actions-icon material-icons">cancel</i>
            </button>
          </div>
        )}
      </div>
      <div className="col s3">        
        <h5>         
          <span
            className="im-createTime black-text "
            title={moment(incidentData.CreatedAT).format(
              "MMMM DD YYYY, h:mm:ss a"
            )}
          >
            Created by{" "}
            <a className="username"> {getNameById(incidentData.CreatedBy)} </a>{" "}
            - {moment(incidentData.CreatedAT).fromNow()}
          </span>
        </h5>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {     
      allAssignees: state.users.users,
      userId :state.userLogin.userId, 
      incidentData: state.incidents.IncidentSelected,   
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {     
      updateIncident: (parameters) => dispatch(updateIncident(parameters)),  
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(IncidentTitle);