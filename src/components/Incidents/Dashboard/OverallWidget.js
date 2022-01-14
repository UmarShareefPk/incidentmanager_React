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
        console.log("overallWidgetData", overallWidgetData);
        const options = {
            chart: {
                type: 'pie',
                height: (70) + '%',
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
                            [0, 'rgba(245,124,0,1)'],
                            [1, 'rgba(255,226,0,1)']
                        ]
                    } },
                    //{ name: 'In Progress', y: overallWidgetData.InProgress, color: '#1976D2' },
                    { name: 'In Progress', y: overallWidgetData.InProgress, color: {
                        linearGradient:  [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(25,118,210,1)'],
                            [1, 'rgba(0,237,255,1)']
                        ]
                    } },
                    { name: 'Closed', y: overallWidgetData.Closed,  color: {
                        linearGradient:  [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(67,160,71,1)'],
                            [1, 'rgba(0,255,187,1)']
                        ]
                    } },
                   // { name: 'Closed', y: overallWidgetData.Closed, color: '#43A047' },
                    { name: 'Approved', y: overallWidgetData.Approved,  color: {
                        linearGradient:  [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(27,94,32,1)'],
                            [1, 'rgba(19,255,0,1)']
                        ]
                    } },
                    { name: 'Late', y: overallWidgetData.Late,  color: {
                        linearGradient:  [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(183,28,28,1)'],
                            [1, 'rgba(255,140,0,1)']
                        ]
                    } }

                    //{ name: 'Approved', y: overallWidgetData.Approved, color: '#1B5E20' },
                    //{ name: 'Late', y: overallWidgetData.Late, color: '#B71C1C' }
                ]
            }]
        }

        setChartOptions(options);
    }, [overallWidgetData])


    return (
        <div className="col s12 m12 l6 widget">
            <h5> Overall</h5>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
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

