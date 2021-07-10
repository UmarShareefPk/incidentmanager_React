import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function MostAssignedByUser() {

    const options = {
        title: {
          text: 'My chart'
        },
        chart: {    
          type: 'bar',
          height: (70) + '%',
          //width: (100) + '%',
         },
         title:{
            text:''
        },
        credits:
        {
            enabled: false
        },
        legend: {
            enabled: false
        },
        yAxis: {
            title: {
                text: ''
            }
        },
    
        xAxis: {
            type: 'category',
            min: 0,
            labels: {
                animate: true
            }
        },
      
         series: [{
          name: '',
          dataSorting: {
            enabled: true,
            sortKey: 'y'
        },
          data: [
              { name: 'Umar Shareef', y: 43, color:'#B71C1C' },
              { name: 'Maryam Umar', y: 24, color:'#E53935' },
              { name: 'Ali Ashraf', y:22, color:'#EF5350' },
              { name: 'Lala lala', y: 15, color:'#E57373' },
              { name: 'Trump', y: 9, color:'#FFCDD2' }                
          ]
      }]
      }

    return (
      <div className="col s12 m12 l6 widget">
        <div className="">
          <h5> Most Assigned To Users</h5>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    );
}

export default MostAssignedByUser
