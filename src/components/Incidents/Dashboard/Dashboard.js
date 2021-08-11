import React from 'react'
import PageActions from '../../PageActions';
import KPIBar from './KPIBar';
import OverallWidget from './OverallWidget'
import LastFive from './LastFive';
import  '../../../styles/dashboard.css'
import MostAssignedByUser from './MostAssignedByUser';
import DayByDayCount from './DayByDayCount';
import FiveOldestOpenIncidents from './OldestOpen';

 function Dashboard() {
 

    return (
      <div>
        <PageActions Title={"Dashboard"} />
        
        <div className="container">     
          <KPIBar />
          <div className="row">
            <OverallWidget />
            <LastFive />
          </div>

          <div className="row">
           <MostAssignedByUser />
           <FiveOldestOpenIncidents />
           {/* <DayByDayCount /> */}
          </div>

        </div>
      </div>
    );
}

export default Dashboard;