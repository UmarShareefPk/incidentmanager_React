import {React, useEffect, useState, useRef} from 'react';
import PageActions from "../PageActions";
import M from 'materialize-css';
import { connect } from 'react-redux';
import { allUsers } from '../../store/actions/usersActions';
import { getIncidentById } from '../../store/actions/incidentsActions';

 function IncidentDetails({match , incidentData, getIncidentById, allAssignees}) {

  
    console.log(incidentData);
   
    const [assignee, setAssignee] = useState(null);  
    const [assigneeName, setAssigneeName] = useState("");  
    const [assigneeList, setAssigneeList] = useState(allAssignees);

    const assigneeRef = useRef();
    const statusRef = useRef();

    useEffect(() => {
        var options = {
            closeOnClick : false
          }
        M.Dropdown.init(assigneeRef.current, options);
        M.FormSelect.init(statusRef.current);
        getIncidentById(match.params.id);
        
    }, []);

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

    return (
      <>
        <PageActions Title={"Incident Details"} />
        <section>
          <div className="container">
            <div className="row">
                <div className="col s12 l10 offset-l1">{/* Title Section */}
                    <div className=" input-field">
                        <h5> {incidentData.Title} </h5>                       
                     </div>
                     <div className="input-field">
                        <h6> {incidentData.Description} </h6>                       
                     </div>
                </div>
                <div className="col s12 l6 offset-l0"> {/* Fields Section */}
                    
                     <div className="row">
                         <div className="col s12">
                            <span  className="align-left"> Assignee : </span> 
                            <div className="input-field inline">
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
                                    <input type="text"  placeholder="Search Assignee" onChange={searchAssignee}     />
                                    </li>
                                    {assigneeList.map((user) => {
                                    return (
                                        <li  key={user.Id} onClick= {()=>assigneeSelected(user.Id)}>
                                        <a className="indigo-text" href="#!">  {user.FirstName + " " + user.LastName}    </a>
                                        </li>
                                    );
                                    })}
                                </ul>  
                        </div>
                        </div>
                     </div>        
                     {/* <div className="row">
                         <div className="col s12">
                             <div className="input-field inline">
                             </div>                                    
                         </div>
                     </div>     */}

                     <div className="row">
                         <div className="col s12">
                             <span className="align-left">Status:</span>
                             <div className="input-field inline  align-right">
                               
                                <select ref={statusRef}>
                                    <option value="" disabled selected>Choose your option</option>                                
                                    <option value="I">In Progress</option>
                                    <option value="C">Closed</option>
                                    <option value="A">Approved</option>
                                </select> 
                             </div>                                    
                         </div>
                     </div> 

                     <div className="row">
                         <div className="col s12">
                             <div className="input-field inline">
                                <span className="">Addtional Details </span>                        
                                {/* <textarea id="description" className="materialize-textarea inline align-right" value={incidentData.AdditionalData}>                                       
                                </textarea>      */}
                                <p>{incidentData.AdditionalData}</p>
                             </div>                                    
                         </div>
                     </div>    
                      
                  
                   
                </div>

                <div className="col s12 l4  offset-l1"> {/* Comment Section */}
                    <h5> Comments</h5>
                    <div class="card">          
                        <div class="card-content">
                            <span class="card-title">Umar Shareef Wrote</span>
                            <p>This is a test comment and is static.</p>
                        </div>                        
                    </div>
                </div>
            </div> {/* end row */}
          </div>
        </section>
      </>
    );
}


const mapStateToProps = (state) => {        
    return{
        allAssignees : state.users.users,
        incidentData :state.incidents.IncidentSelected      
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getAllAssignees: () => dispatch(allUsers()),
        getIncidentById : (incidentId) => dispatch(getIncidentById(incidentId))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(IncidentDetails);

