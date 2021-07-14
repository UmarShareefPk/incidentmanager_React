import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function DayByDayCount() {

    const options = {
        title: {
          text: ''
        },
        chart: {    
          type: 'line',
         // height: (70) + '%',
          //width: (100) + '%',
         },
         yAxis: {
            title: {
                text: 'Number of Incidents'
            }
        },
    
        xAxis: {
            title: {
                text: 'Day of the month'
            },
            accessibility: {
                rangeDescription: 'Range: 1 to 31'
            }
        },
    
        legend: {
           // layout: 'vertical',
         //   align: 'right',
           // verticalAlign: 'middle'
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 1
            }
        },
    
        series: [{
            name: 'July 2021',
            color:'#1976D2',
            data: [13,93,90,49,63,7,41,24,85,96,35,71,70,51,5,20,74,46,12,9,19,21,59,39,55,75,34,89,84,10,99]
        }, {
            name: 'June 2021',
            color:'lightgray',
            data: [38,96,15,58,9,35,33,99,70,93,60,32,44,21,62,3,11,5,85,25,71,73,55,22,63,88,28,40,84,45,64]
        }, {
            name: 'May 2021',
            color:'lightgray',
            data: [65,96,57,13,61,89,51,30,87,45,88,84,56,43,24,22,5,69,12,59,82,15,25,21,95,55,33,49,10,28,81]
        }, {
            name: 'April 2021',
            color:'lightgray',
            data: [24,48,34,100,35,23,16,9,72,80,12,13,21,61,77,22,7,27,5,19,36,98,88,29,43,90,60,70,32,57,8]
        }],
      }

    return (
      <div className="col s12 m12 l12 widget ">
        <div className="">
          <h5> Day By Day Count</h5>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    );
}

export default DayByDayCount
