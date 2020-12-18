import { React, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Pages from '../Pages'
import Incident from './Incident'
import PageActions from "../PageActions";
import { incidentsWithPage } from "../../store/actions/incidentsActions";

 function IncidentLisiting(props) {
   
    const [PageNumber, setPageNumber] = useState(1);
    const [PageSize, setPageSize] = useState(5);

    useEffect(() => {
        const parameters = {
            PageNumber : PageNumber,
            PageSize : PageSize
        }        
        props.incidentsWithPage(parameters);
        return () => {
            
        }
    }, [PageNumber, PageSize])

    
    return (
      <>
        <PageActions Title={"Incidents"} />        
        <section>
          <div className="container">
            <div className="row">
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
                            <Incident key={incident.Id} incident= {incident} />
                          )
                      })
                  }           
                  </tbody>
                </table>
                <Pages  TotalPages={props.TotalIncidents} PostsPerPage={PageSize} setPageNumber={setPageNumber} setPageSize={setPageSize}  />
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