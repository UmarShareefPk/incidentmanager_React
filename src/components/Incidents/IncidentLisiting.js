import { React, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Pages from '../Pages'
import Incident from './Incident'
import PageActions from "../PageActions";
import { incidentsWithPage } from "../../store/actions/incidentsActions";

 function IncidentLisiting(props) {
   
    
    useEffect(() => {
        const parameters = {
            PageNumber : 1,
            PageSize : 5
        }   
        console.log("IncidentListing use effect");     
        props.incidentsWithPage(parameters);
        return () => {
            
        }
    }, [props.PageNumber , props.PageSize])

    console.log(props.Incidents);
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
                            <Incident incident= {incident} />
                          )
                      })
                  }
                   
                              
                  </tbody>
                </table>
                <Pages />
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
        TotalIncidents : state.incidents.TotalIncidents,
        PageNumber : state.incidents.PageNumber,
        PageSize : state.incidents.PageSize
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        incidentsWithPage: (parameters) => dispatch(incidentsWithPage(parameters))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(IncidentLisiting);