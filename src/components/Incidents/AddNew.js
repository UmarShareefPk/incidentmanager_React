import {React , useRef, useEffect, useState} from 'react';
import PageActions from "../PageActions";
import M from 'materialize-css';
import {  useHistory  } from 'react-router-dom';
import Incident from "../../models/Incident";
import { connect } from 'react-redux';
import { allUsers } from '../../store/actions/usersActions'

 function AddNew({getAllAssignees, allAssignees, userId}) {

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

    useEffect(() => {      
        M.Datepicker.init(startTimeDateRef.current);
        M.Timepicker.init(startTimeTimeRef.current);
        M.Datepicker.init(dueDateDateRef.current);
        M.Timepicker.init(dueDateTimeRef.current); 
        M.FormSelect.init(assigneeRef.current);
      
        getAllAssignees();  
       
        return () => {
          
        }

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

   const saveClick = (event) => {
     event.preventDefault();    

     let newIncident = new Incident(
       null,
       userId,
       assigneeRef.current.value,
       null,
       title,
       description,
       additionalDetails,
       files,
       null,
       null,
       new Date(
         startTimeDateRef.current.value + " " + startTimeTimeRef.current.value
       ),
       new Date(
         dueDateDateRef.current.value + " " + dueDateTimeRef.current.value
       ),
       "N"
     );
     console.log(newIncident);
   }; 
   M.FormSelect.init(assigneeRef.current);
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
                      <div className="input-field">
                        <input
                          type="text"
                          id="title"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <label htmlFor="title" >
                          Title
                        </label>
                      </div>
                    </div>

                    <div className="input-field col s12 l6">
                      <select ref={assigneeRef} onClick={(e)=> alert(e.target)} >
                         <option  value="hehe"> Khan baba</option>
                        {
                            allAssignees.map(user => {                               
                                return (
                                    <option key={user.Id} value={user.Id}>{user.FirstName + " " + user.LastName}</option>
                                )
                            })
                        }                    
                      </select>
                      <label>Assignee</label>
                    </div>
                  </div>

                  <div className="input-field">
                    <textarea
                      id="description"
                      className="materialize-textarea"
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <label htmlFor="description" className="">
                      Description
                    </label>
                  </div>

                  <div className="input-field">
                    <textarea
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
                        type="text"
                        id="startTimeDate"
                        className="datepicker"
                        ref={startTimeDateRef}
                      />
                      <label htmlFor="startTimeDate" className="">
                        When the problem started (Pick Date)
                      </label>
                    </div>

                    <div className="input-field col s6">
                      <input
                        type="text"
                        id="startTimeTime"
                        className="timepicker"
                        ref={startTimeTimeRef}
                      />
                      <label htmlFor="startTimeime" className="">
                        When the problem started (Pick Time)
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        type="text"
                        id="dueDateDate"
                        className="datepicker"
                        ref={dueDateDateRef}
                      />
                      <label htmlFor="dueDateDate" className="">
                        Due Date (Pick Date)
                      </label>
                    </div>

                    <div className="input-field col s6">
                      <input
                        type="text"
                        id="dueDateTime"
                        className="timepicker"
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
       
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getAllAssignees: () => dispatch(allUsers())
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(AddNew);
