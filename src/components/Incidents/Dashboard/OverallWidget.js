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
                    { name: 'New', y: overallWidgetData.New, color: '#F57C00' },
                    { name: 'In Progress', y: overallWidgetData.InProgress, color: '#1976D2' },
                    { name: 'Closed', y: overallWidgetData.Closed, color: '#43A047' },
                    { name: 'Approved', y: overallWidgetData.Approved, color: '#1B5E20' },
                    { name: 'Late', y: overallWidgetData.Late, color: '#B71C1C' }
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

