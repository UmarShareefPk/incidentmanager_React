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
        tooltip: {
            //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f}%)</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
         series: [{
          name: 'Share',
          data: [
              { name: 'New', y: 100, color:'#F57C00' },
              { name: 'In Progress', y: 200, color:'#1976D2' },
              { name: 'Closed', y:205, color:'#43A047' },
              { name: 'Approved', y: 50, color:'#1B5E20' },
              { name: 'Late', y: 150, color:'#B71C1C' }                
          ]
      }]
      }

    return (
        <div className="col s12 m12 l6 widget">
            <h5> Overall</h5>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default OverallWidget
