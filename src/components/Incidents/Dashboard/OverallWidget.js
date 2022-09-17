import React ,{useEffect, useState, useRef} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {GetOverallWidget} from '../../../store/actions/dashboardActions';
import { connect } from 'react-redux';

function OverallWidget({overallWidgetData, getOverallWidgetData}) {
    const [chartOptions, setChartOptions] = useState({});
    const isMounted = useRef(false);

    useEffect(() => {
        getOverallWidgetData();
    }, [])

    useEffect(() => {
        if (isMounted.current) {
             drawChart();
          } else {
            isMounted.current = true;
          }
    }, [overallWidgetData])

    const drawChart = () => {
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
                          [0, 'rgba(196,189,91,1)'],
                          [1, 'rgba(199,190,52,1)']
                        ]
                    } },
                    //{ name: 'In Progress', y: overallWidgetData.InProgress, color: '#1976D2' },
                    { name: 'In Progress', y: overallWidgetData.InProgress, color: {
                        radialGradient: [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(91,159,196,1)'],
                            [1, 'rgba(52,142,199,1) 99%)']
                        ]
                    } },
                    { name: 'Closed', y: overallWidgetData.Closed,  color: {
                        radialGradient: [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(76,177,94,1)'],
                            [1, 'rgba(78,200,94,1)']
                        ]
                    } },
                   // { name: 'Closed', y: overallWidgetData.Closed, color: '#43A047' },
                    { name: 'Approved', y: overallWidgetData.Approved,  color: {
                        radialGradient:  [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(58,131,68,1)'],
                            [1, 'rgba(45,105,56,1)']
                        ]
                    } },
                    { name: 'Late', y: overallWidgetData.Late,  color: {
                        radialGradient:  [0, 0, 0, 300],
                        stops: [
                            [0, 'rgba(199,69,65,1)'],
                            [1, 'rgba(153,47,55,1)']
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
    
    } 

    return (
        <div className="col s12 m12 l6  chart-widget">
            <div className="card">
                <div className="card-content">
                    <h5> Overall</h5>
                    {isMounted.current? 
                        <HighchartsReact  highcharts={Highcharts} options={chartOptions} />
                        :
                        <></>
                    }
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

