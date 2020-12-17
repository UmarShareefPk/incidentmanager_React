import React from 'react'
import Pages from '../Pages'
import Incident from './Incident'
import PageActions from "../PageActions";

export default function IncidentLisiting() {
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
                    <Incident />
                    <Incident />
                    <Incident />
                    <Incident />
                    <Incident />
                    <Incident />
                    <Incident />
                    <Incident />
                    
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
