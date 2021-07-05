import React from 'react'
import PageActions from '../../PageActions';
import KPIBar from './KPIBar';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import OverallWidget from './OverallWidget'

 function Dashboard() {

  const options = {
    title: {
      text: 'My chart'
    },
    chart: {    
      type: 'pie'
     },
    
     series: [{
      name: 'Share',
      data: [
          { name: 'Chrome', y: 61.41, color:'indigo' },
          { name: 'Internet Explorer', y: 11.84 },
          { name: 'Firefox', y: 10.85 },
          { name: 'Edge', y: 4.67 },
          { name: 'Safari', y: 4.18 },
          { name: 'Other', y: 7.05 }
      ]
  }]
  }

    return (
      <div>
        <PageActions Title={"Dashboard"} />
        
        <div className="container">
        {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
          <KPIBar />
          <div className="row">
            <OverallWidget />
          </div>
        </div>
      </div>
    );
}

export default Dashboard;