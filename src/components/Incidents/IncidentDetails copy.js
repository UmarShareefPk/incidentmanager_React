import {React, useEffect, useState, useRef} from 'react';
import PageActions from "../PageActions";
import M from 'materialize-css';
import { connect } from 'react-redux';
import { allUsers } from '../../store/actions/usersActions';
import { getIncidentById } from '../../store/actions/incidentsActions';
import Comment from './Comment';

 function IncidentDetails({match , incidentData, getIncidentById, allAssignees, getAllAssignees}) {

    const [assignee, setAssignee] = useState(null);  
    const [assigneeName, setAssigneeName] = useState("");  
    const [assigneeList, setAssigneeList] = useState(allAssignees);
    console.log("after assignee list");
    const assigneeRef = useRef();
    const statusRef = useRef();

    useEffect(() => {        
        setAssigneeList(allAssignees);       
      }, [allAssignees])

      useEffect(() => {          
        var options = {
            closeOnClick : false
          }
        M.Dropdown.init(assigneeRef.current, options);
        M.FormSelect.init(statusRef.current);        
      })
  

    useEffect(() => {       
        getIncidentById(match.params.id);
        getAllAssignees();
        
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

      if(!incidentData || !allAssignees ){
          console.log(incidentData , allAssignees, assigneeList);
          return (<h1> Loading</h1>)
      }

      if(allAssignees && ! assigneeList){
          setAssigneeList(allAssignees);
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
                                    {!assigneeList? null : assigneeList.map((user) => {
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
                                    <option  defaultValue="" disabled selected>Choose your option</option>                                
                                    <option defaultValue="I">In Progress</option>
                                    <option defaultValue="C">Closed</option>
                                    <option defaultValue="A">Approved</option>
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
                    <Comment />
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
        incidentData : state.incidents.IncidentSelected      
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getAllAssignees: () => dispatch(allUsers()),
        getIncidentById : (incidentId) => dispatch(getIncidentById(incidentId))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(IncidentDetails);

