import React ,{useEffect, useState} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {GetOverallWidget} from '../../../store/actions/dashboardActions';
import { connect } from 'react-redux';

function OverallWidget({overallWidgetData, getOverallWidgetData}) {
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        getOverallWidgetData();
    }, [])

    useEffect(() => {
     
        const options = {
            chart: {
                type: 'pie',
                // height: (80) + '%',
            },
            title: {
                text: ''
            },
            credits:
            {
                enabled: false
            },
            tooltip: {
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
                    //{ name: 'New', y: overallWidgetData.New, color: '#F57C00' },
                    { name: 'New', y: overallWidgetData.New,   color: {
                        radialGradient: [0, 0, 0, 300],
                        stops: [
                          [0, 'rgba(245,124,0,1)'],
                          [1, 'rgba(255,226,0,1)']
                        ]
                    } },
                    //{ name: 'In Progress', y: overallWidgetData.InProgress, color: '#1976D2' },
                    { name: 'In Progress', y: overallWidgetData.InProgress, color: {
                        radialGradient: [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(113, 166, 247, 1)'],
                            [1, 'rgba(48, 128, 204, 1)']
                        ]
                    } },
                    { name: 'Closed', y: overallWidgetData.Closed,  color: {
                        radialGradient: [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(66, 194, 56, 1)'],
                            [1, 'rgba(113, 200, 120, 1)']
                        ]
                    } },
                   // { name: 'Closed', y: overallWidgetData.Closed, color: '#43A047' },
                    { name: 'Approved', y: overallWidgetData.Approved,  color: {
                        radialGradient:  [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(12, 99, 5, 1)'],
                            [1, 'rgba(14, 131, 22, 1)']
                        ]
                    } },
                    { name: 'Late', y: overallWidgetData.Late,  color: {
                        radialGradient:  [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(218, 30, 28, 1)'],
                            [1, 'rgba(131, 55, 14, 1)']
                        ]
                    } }

                    //{ name: 'Approved', y: overallWidgetData.Approved, color: '#1B5E20' },
                    //{ name: 'Late', y: overallWidgetData.Late, color: '#B71C1C' }
                ]
            }]
        }
        try{
            setChartOptions(options);
        }catch(e){}
    
    }, [overallWidgetData])


    return (
        <div className="col s12 m12 l6  chart-widget">
            <div className="card">
                <div className="card-content">
                    <h5> Overall</h5>
                    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {        
    return{   
        userId :state.userLogin.userId,  // logged in User Id  
        overallWidgetData: state.dashboard.OverallWidgetData
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getOverallWidgetData: () => dispatch(GetOverallWidget()),     
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(OverallWidget);

