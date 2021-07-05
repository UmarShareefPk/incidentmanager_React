import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function OverallWidget() {

    const options = {
        title: {
          text: 'My chart'
        },
        chart: {    
          type: 'pie',
          height: (80) + '%',
          //width: (100) + '%',
         },
         title:{
            text:''
        },
        
         series: [{
          name: 'Share',
          data: [
              { name: 'New', y: 100, color:'orange' },
              { name: 'In Progress', y: 200, color:'blue' },
              { name: 'Closed', y:205, color:'green' },
              { name: 'Approved', y: 50, color:'darkgreen' }             
          ]
      }]
      }

    return (
        <div className="col s12 m12 l6">
            <h5> Overall</h5>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default OverallWidget
