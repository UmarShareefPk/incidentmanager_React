import React from 'react'
import PageActions from '../../PageActions';
import KPI from './KPI';

 function Dashboard() {
    return (
      <div>
        <PageActions Title={"Dashboard"} />

        <div className="container">
          <KPI />
        </div>
      </div>
    );
}

export default Dashboard;