import {React , useRef, useEffect, useState} from 'react';
import PageActions from "../PageActions";
import M from 'materialize-css';
import {  useHistory  } from 'react-router-dom';
import { connect } from 'react-redux';
import { allUsers } from '../../store/actions/usersActions';
import { addNewIncident } from '../../store/actions/incidentsActions';
import { Redirect } from 'react-router-dom'

 function AddNew({getAllAssignees, allAssignees, userId, addNewIncident, addNewError, AddNewIncidentStatus}) {

    const dueDateTimeRef= useRef();
    const dueDateDateRef= useRef();
    const startTimeTimeRef = useRef();
    const startTimeDateRef = useRef();
    const assigneeRef = useRef();   
   

    const history = useHistory();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [additionalDetails, setAdditionalDetails] = useState("");  
    const [files , setFiles] = useState(null);
    const [assignee, setAssignee] = useState(null);  
    const [assigneeName, setAssigneeName] = useState("");  
    const [assigneeList, setAssigneeList] = useState(allAssignees);
    const [formError, setFormError] = useState("");

    useEffect(() => {
      console.log("Set hook");
      setAssigneeList(allAssignees);
    }, [allAssignees])

    useEffect(() => {      
        M.Datepicker.init(startTimeDateRef.current);
        M.Timepicker.init(startTimeTimeRef.current);
        M.Datepicker.init(dueDateDateRef.current);
        M.Timepicker.init(dueDateTimeRef.current);
        var options = {
          closeOnClick : false
        }
        M.Dropdown.init(assigneeRef.current, options);
        getAllAssignees();
    }, []);

   const onFileChange = (event) => {    
     if (event.target.files.length > 3) {
       //alert("You can only attach upto 3 files. All extra files will be ignored.");
     }     
     setFiles(event.target.files);
   };

   const cancelClick = (event) => {
     event.preventDefault();
     history.goBack();
     //console.log(history);
   };


   const assigneeSelected = (userId) => {       
    let currentAssignee = allAssignees.find(assignee => {
        return assignee.Id === userId
    })
    console.log(currentAssignee);
    var assigneeDropdown = M.Dropdown.getInstance(assigneeRef.current);
    assigneeDropdown.close();
    setAssignee(userId);
    setAssigneeName(currentAssignee.FirstName + " " + currentAssignee.LastName);
   }

   const searchAssignee = (event) => {    
     let newList = [];
     if(event.target.value !== "")
        newList = allAssignees.filter(assignee => {    
        return assignee.FirstName.toUpperCase().startsWith(event.target.value.toUpperCase()) 
            || assignee.LastName.toUpperCase().startsWith(event.target.value.toUpperCase());
      });
    
     if(newList !== undefined && newList.length !== 0){ //check if there is atlease one assignee       
      newList = [].concat(newList); 
     }
     else{//if search found nothing, show all assignees
        newList = allAssignees.slice(0,allAssignees.length);       
     } 
     setAssigneeList(newList);   
   }

   const validateForm = () => {

    if(title === "" || description ==="" || dueDateDateRef.current.value === "" || dueDateTimeRef.current.value === ""
        || startTimeDateRef.current.value === "" || startTimeTimeRef.current.value === ""  )
        return false;
    return true;

   }

   const saveClick = (event) => {
    event.preventDefault();     
    if(!validateForm()){
      setFormError("Please complete required fields before saving.")
      return;
    }
    
    setFormError("");

    let startTime  = new Date( startTimeDateRef.current.value + " " + startTimeTimeRef.current.value);
    startTime = (startTime.getMonth() + 1) + "/" + startTime.getDate() + "/" +  startTime.getFullYear() 
                + " " + startTime.getHours() + ":" + startTime.getMinutes() + ":" + startTime.getSeconds(); 

    let dueDate  = new Date( dueDateDateRef.current.value + " " + dueDateTimeRef.current.value);
    dueDate = (dueDate.getMonth() + 1) + "/" + dueDate.getDate() + "/" +  dueDate.getFullYear() 
                + " " + dueDate.getHours() + ":" + dueDate.getMinutes() + ":" + dueDate.getSeconds(); 
   
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
     formData.append("CreatedBy", userId); 
     formData.append("AssignedTo", assignee);
     formData.append("Title", title); 
     formData.append("Description", description); 
     formData.append("AdditionalDeta", additionalDetails); 
     formData.append("StartTime", startTime ); 
     formData.append("DueDate",  dueDate ); 
     formData.append("Status", "N"); 

     
     //setTitle("");

     addNewIncident(formData);
    // setTitle("");
     //setDescription("");     

  }; 

  if(AddNewIncidentStatus){
    return <Redirect to='/incidentListing' /> 
  }
 
    return (
      <>
        <PageActions Title={"Add new Incident"} />
        <section>
          <div className="container">
            <div className="row">
              <div className="col s12 l10 offset-l1">
                <form>
                  <div className="row">
                    <div className="col s12 l6">
                      <div className="input-field ">
                        <input
                        className="validate"
                          required
                          type="text"
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="title">Title</label>
                      </div>
                    </div>

                    <div className="input-field col s12 l6">                    
                      <input
                        readOnly                    
                        required
                        type="text"
                        className="dropdown-trigger validate"
                        id="assignee"
                        data-target="dropdown1"
                        placeholder=""
                        ref={assigneeRef}
                        value={assigneeName}
                      />                    
                      
                       <label htmlFor="assignee">Assignee </label> 
                    </div>
                      <ul id="dropdown1" className="dropdown-content">
                        <li>
                          <input type="text"  placeholder="Search Assignee" onChange={searchAssignee}     />
                        </li>
                        {!assigneeList? null : assigneeList.map((user) => {
                          return (
                            <li  key={user.Id} onClick= {()=>assigneeSelected(user.Id)}>
                              <a className="indigo-text" href="#!">  {user.FirstName + " " + user.LastName}    </a>
                            </li>
                          );
                        })}
                      </ul>                   
                  </div>
                  <div className="input-field">
                    <textarea
                      required
                      value={description}
                      id="description"
                      className="materialize-textarea validate"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <label htmlFor="description" className="">
                      Description
                    </label>
                  </div>

                  <div className="input-field">
                    <textarea
                      value={additionalDetails}
                      id="additionalDetails"
                      className="materialize-textarea"
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                    ></textarea>
                    <label htmlFor="additionalDetails" className="">
                      Additional Details
                    </label>
                  </div>

                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        required
                        type="text"
                        id="startTimeDate"
                        className="datepicker validate"
                        ref={startTimeDateRef}
                      />
                      <label htmlFor="startTimeDate" className="">
                      Start Time (Pick Date)
                      </label>
                    </div>

                    <div className="input-field col s6">
                      <input
                        required
                        type="text"
                        id="startTimeTime"
                        className="timepicker validate"
                        ref={startTimeTimeRef}
                      />
                      <label htmlFor="startTimeime" className="">
                       Start Time (Pick Time)
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        required
                        type="text"
                        id="dueDateDate"
                        className="datepicker validate"
                        ref={dueDateDateRef}
                      />
                      <label htmlFor="dueDateDate" className="">
                        Due Date (Pick Date)
                      </label>
                    </div>

                    <div className="input-field col s6">
                      <input
                        required
                        type="text"
                        id="dueDateTime"
                        className="timepicker validate" 
                        ref={dueDateTimeRef}
                      />
                      <label htmlFor="dueDateTime" className="">
                        Due Date (Pick Time)
                      </label>
                    </div>
                  </div>

                  <div className="file-field input-field">
                    <div className="btn indigo darken-2">
                      <i className="material-icons ">attachment</i>
                      <input
                        type="file"
                        id="attachment"
                        multiple
                        onChange={onFileChange}
                      />
                    </div>
                    <div className="file-path-wrapper">
                      <input
                        className="file-path validate"
                        type="text"
                        placeholder="Upload upto 3 files"
                      />
                    </div>
                  </div>
                  
                  <div className="input-field">
                      <p className="red-text center">{formError ? formError : "" }</p>
                      <p className="red-text center">{addNewError}</p>
                      
                  </div>

                  
                  <div className="input-field ">
                    <button
                      className="btn green darken-2 left"
                      onClick={saveClick}
                    >
                      <span>Save</span>
                      <i className="material-icons right">save</i>
                    </button>

                    <button
                      className="btn yellow darken-4 left"
                      onClick={cancelClick}
                    >
                      <span>Cancel</span>
                      <i className="material-icons right">cancel</i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

const mapStateToProps = (state) => {        
    return{
        allAssignees : state.users.users,
        user_Name :state.userLogin.user_Name, // Logged in User's name
        userId :state.userLogin.userId,  // logged in User Id      
        addNewError :state.incidents.AddNewIncidentError, 
        AddNewIncidentStatus :state.incidents.AddNewIncidentStatus 
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getAllAssignees: () => dispatch(allUsers()),
        addNewIncident : (formData) => dispatch(addNewIncident(formData))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(AddNew);
