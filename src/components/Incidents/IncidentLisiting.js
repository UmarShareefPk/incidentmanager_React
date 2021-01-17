import { React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Pages from '../Pages'
import Incident from './Incident'
import PageActions from "../PageActions";
import { allUsers } from "../../store/actions/usersActions";
import { incidentsWithPage, cancel } from "../../store/actions/incidentsActions";
import {  useHistory  } from 'react-router-dom';


 function IncidentLisiting(props) {
   
    const [PageNumber, setPageNumber] = useState(1);
    const [PageSize, setPageSize] = useState(5);
    const [Search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
      props.getAllAssignees();      
    }, []);


   
    useEffect(() => {
        const parameters = {
            PageNumber : PageNumber,
            PageSize : PageSize,
            Search : Search            
        }        
        setLoading(true);
        props.incidentsWithPage(parameters);
        setLoading(false);
        return () => {
          cancel();        // cancel axios  
        }
    }, [PageNumber, PageSize, Search])

    const searchTextChange =   (text) => {      
            setSearch(text);
            setPageNumber(1);
    }

    const addNewClick = ()=>{
      const data = false;
      props.dispatch({ type: 'NEW_INCIDENT_STATUS', data });
      let path = '/AddNew';      
      history.push(path);
    }

    const getUserNameById = (id) => {   
      let user = props.allAssignees.find((assignee) => {
        return assignee.Id === id;
      });   
      if(!user){    
        return id;
      }
      return user.FirstName + " " + user.LastName
    }

    if(props.Error!==""){
      return (
        <div className="container">
          <h1 className="center red-text">Error</h1>
          <h5 className="center">{props.Error}</h5>
          <p className="center">Please check your network and try loging back.</p>
        </div>
      )
    }
    
    return (
      <>
        <PageActions Title={"Incidents"} /> 
        { loading? <h1>Loading</h1> : null}
        { props.TotalIncidents === 0? <h1>Zero</h1> : null}
        <section>
          <div className="container">
            <div className="row">

              <div className="col s6 l6">
                <div className="input-field">                
                  <input type="text" id="search" value={Search}  onChange={(e) => searchTextChange(e.target.value)} />
                  <label htmlFor="search">Search</label>
                </div>
              </div>
              
              <div className="col s6 l6">
                <div className="input-field">              
                  <button className="btn green darken-4 right" onClick={()=>addNewClick()} >
                    <span>Add New</span>
                    <i className="material-icons right">create</i>
                  </button>
                </div>
              </div>

              <div className="col s12 l12">
                <table className="responsive-table highlight incidentsTbl">
                  <thead>
                    <tr className="header" data-target="blue">
                      <th>Title</th>
                      <th>Description</th>
                      <th>Assigned TO</th>
                      <th>Created By</th>
                      <th>Created Date</th>
                      <th>Due Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                      props.Incidents.map(incident=>{
                          return (
                            <Incident key={incident.Id} incident= {incident} getUserNameById={getUserNameById} />                          )
                      })
                  }           
                  </tbody>
                </table>
                <Pages  TotalPages={props.TotalIncidents} PostsPerPage={PageSize} setPageNumber={setPageNumber} setPageSize={setPageSize} search={Search} />
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

const mapStateToProps = (state) => {
    return{
        allAssignees: state.users.users,
        Incidents : state.incidents.Incidents,
        TotalIncidents : state.incidents.TotalIncidents,
        Error : state.incidents.IncidentsError   // if there is an error while getting data from API
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        incidentsWithPage: (parameters) => dispatch(incidentsWithPage(parameters)),
        getAllAssignees: () => dispatch(allUsers()),
        dispatch:dispatch
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(IncidentLisiting);