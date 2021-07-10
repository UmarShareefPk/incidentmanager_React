import { React, useEffect, useState, useRef } from "react";

import { updateIncident } from "../../../store/actions/incidentsActions";
import { connect } from "react-redux";


function IncidentDescription({type, incidentData, updateIncident, userId}) {

    const [description, setDescription] = useState("");
    const [editDescription, setEditDescription] = useState(false);

    useEffect(() => {
        setDescription(type === "description"? incidentData.Description : incidentData.AdditionalData);       
       }, [incidentData, type])

    const updateIncidentByField = (field , value) => {    
        let parameters = {
          IncidentId : incidentData.Id,
          Parameter : field,
          Value : value,
          UserId : userId
        };
        updateIncident(parameters); // Calling action here
      }

    const descriptionEditClick = () =>{
        setEditDescription(!editDescription);
        setDescription(type === "description"? incidentData.Description : incidentData.AdditionalData);
       
      }
      const descriptionEditCancel = () =>{
        setDescription(type === "description"? incidentData.Description : incidentData.AdditionalData);
        setEditDescription(false);
      }
    
      const descriptionEditSave = () =>{
        if(description.trim() === ""){
          alert("Description cannot be empty.");
          setDescription(incidentData.Description);
          return;
        }
        type === "description"
        ? updateIncidentByField("Description", description.trim())
        : updateIncidentByField("AdditionalData", description.trim());
       
        setEditDescription(false);
      }
    return (
        <>
                 <p className="heading left-align indigo-text darken-4">
                    {" "}
                    {/* Description  */}
                    {type === "description" ? "Description" : "Additional Details"}
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
        </>
    )
}

const mapStateToProps = (state) => {
    return {     
      incidentData: state.incidents.IncidentSelected,
      userId :state.userLogin.userId,    
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {     
      updateIncident: (parameters) => dispatch(updateIncident(parameters)),  
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(IncidentDescription);
