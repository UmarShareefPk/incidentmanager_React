import React, {useEffect, useState, useRef} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {GetMostAssignedToUsers} from '../../../store/actions/dashboardActions';
import { connect } from 'react-redux';

function MostAssignedByUser({MostAssignedIncidentsData, getMostAssignedToUsers}) {
  const [chartOptions, setChartOptions] = useState({});
  const isMounted = useRef(false);

  useEffect(() => {
    getMostAssignedToUsers();
  }, []);

  useEffect(() => {
    if (isMounted.current) {
         drawChart();
      } else {
        isMounted.current = true;
      }
}, [MostAssignedIncidentsData])


   if(MostAssignedIncidentsData.length ===0 || MostAssignedIncidentsData == null )
   return (<h3>loading..</h3>);

  let data = [];
  let _color = {
    linearGradient: [0, 0, 0, 300],
    stops: [
      [0, 'rgba(6,131,181,1)'],
      [1, 'rgba(7,65,105,1)']
    ]
  }

  try{
    data =  [
      { name: MostAssignedIncidentsData[0].Name, y: parseInt(MostAssignedIncidentsData[0].Count),  color: _color },
      { name: MostAssignedIncidentsData[1].Name, y: parseInt(MostAssignedIncidentsData[1].Count),color: _color },
      { name: MostAssignedIncidentsData[2].Name, y: parseInt(MostAssignedIncidentsData[2].Count), color: _color  },
      { name: MostAssignedIncidentsData[3].Name, y: parseInt(MostAssignedIncidentsData[3].Count), color:_color },
      { name: MostAssignedIncidentsData[4].Name, y: parseInt(MostAssignedIncidentsData[4].Count), color: _color }  
  ];

  }
  catch(err){
    console.log("error", err);
  }

  const drawChart = () =>{
    const options = {
        title: {
          text: 'My chart'
        },
        chart: {    
          type: 'bar',
          // height: (70) + '%',
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
          data: data
      }]
      }
      setChartOptions(options);
    }

    return (
      <div className="col s12 m12 l6">
        <div className="card">
          <div className="card-content">
            <h5> Most Assigned To Users</h5>
            {isMounted.current ?

              <HighchartsReact highcharts={Highcharts} options={chartOptions} />
              : <></>
            }
            </div>
        </div>
      </div>
    );
}


const mapStateToProps = (state) => {        
  return{   
      userId :state.userLogin.userId,  // logged in User Id  
      MostAssignedIncidentsData: state.dashboard.MostAssignedIncidentsData,
      
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMostAssignedToUsers: () => dispatch(GetMostAssignedToUsers()),     
  }
}

// create 

export default connect(mapStateToProps, mapDispatchToProps)(MostAssignedByUser);

//please invert binary tree
