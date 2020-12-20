import { React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Pages from '../Pages'
import Incident from './Incident'
import PageActions from "../PageActions";
import { incidentsWithPage } from "../../store/actions/incidentsActions";
import {  useHistory  } from 'react-router-dom'

 function IncidentLisiting(props) {
   
    const [PageNumber, setPageNumber] = useState(1);
    const [PageSize, setPageSize] = useState(5);
    const [Search, setSearch] = useState("");

    const history = useHistory();
    
    useEffect(() => {
        const parameters = {
            PageNumber : PageNumber,
            PageSize : PageSize,
            Search : Search
        }        
        props.incidentsWithPage(parameters);
        return () => {
            
        }
    }, [PageNumber, PageSize, Search])

    const searchTextChange =   (text) => {      
            setSearch(text);
            setPageNumber(1);
    }

    const addNewClick = ()=>{
      let path = '/AddNew'; 
      history.push(path);
    }
    
    return (
      <>
        <PageActions Title={"Incidents"} /> 

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
                            <Incident key={incident.Id} incident= {incident} />                          )
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
        Incidents : state.incidents.Incidents,
        TotalIncidents : state.incidents.TotalIncidents      
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        incidentsWithPage: (parameters) => dispatch(incidentsWithPage(parameters))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(IncidentLisiting);