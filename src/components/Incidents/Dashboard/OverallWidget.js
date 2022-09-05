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
                        linearGradient:  [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(219,170,62,1)'],
                            [1, 'rgba(228,184,117,1)']
                        ]
                    } },
                    //{ name: 'In Progress', y: overallWidgetData.InProgress, color: '#1976D2' },
                    { name: 'In Progress', y: overallWidgetData.InProgress, color: {
                        linearGradient:  [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(0,113,255,1)'],
                            [1, 'rgba(85,182,224,1)']
                        ]
                    } },
                    { name: 'Closed', y: overallWidgetData.Closed,  color: {
                        linearGradient:  [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(69,138,25,1)'],
                            [1, 'rgba(122,199,79,1)']
                        ]
                    } },
                   // { name: 'Closed', y: overallWidgetData.Closed, color: '#43A047' },
                    { name: 'Approved', y: overallWidgetData.Approved,  color: {
                        linearGradient:  [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(15,94,7,1)'],
                            [1, 'rgba(79,196,124,1)']
                        ]
                    } },
                    { name: 'Late', y: overallWidgetData.Late,  color: {
                        linearGradient:  [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(94,12,7,1)'],
                            [1, 'rgba(173,70,62,1)']
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

