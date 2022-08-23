import React, {useEffect} from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import {GetMostAssignedToUsers} from '../../../store/actions/dashboardActions';
import { connect } from 'react-redux';

function MostAssignedByUser({MostAssignedIncidentsData, getMostAssignedToUsers}) {

  useEffect(() => {
    getMostAssignedToUsers();
  }, []);

   if(MostAssignedIncidentsData.length ===0 || MostAssignedIncidentsData == null )
   return (<h3>loading..</h3>);

  let data = [];

  try{
    data =  [
      // { name: MostAssignedIncidentsData[0].Name, y: parseInt(MostAssignedIncidentsData[0].Count), color:'#B71C1C' },
      // { name: MostAssignedIncidentsData[1].Name, y: parseInt(MostAssignedIncidentsData[1].Count), color:'#E53935' },
      // { name: MostAssignedIncidentsData[2].Name, y: parseInt(MostAssignedIncidentsData[2].Count), color:'#EF5350' },
      // { name: MostAssignedIncidentsData[3].Name, y: parseInt(MostAssignedIncidentsData[3].Count), color:'#E57373' },
      // { name: MostAssignedIncidentsData[4].Name, y: parseInt(MostAssignedIncidentsData[4].Count), color:'#FFCDD2' }  
      
      { name: MostAssignedIncidentsData[0].Name, y: parseInt(MostAssignedIncidentsData[0].Count),  color: {
        linearGradient:  [0, 0, 0, 300],
        stops: [
            [0, 'rgba(255,114,0,1)'],
            [1, 'rgba(183,28,28,1)']           
        ]
      } },
      { name: MostAssignedIncidentsData[1].Name, y: parseInt(MostAssignedIncidentsData[1].Count),color: {
        linearGradient:  [0, 0, 0, 300],
        stops: [
            [0, 'rgba(255,127,0,1)'],
            [1, 'rgba(229,57,53,1)']           
        ]
      }  },
      { name: MostAssignedIncidentsData[2].Name, y: parseInt(MostAssignedIncidentsData[2].Count), color: {
        linearGradient:  [0, 0, 0, 300],
        stops: [
            [0, 'rgba(255,127,0,1)'],
            [1, 'rgba(239,83,80,1)']           
        ]
      }  },
      { name: MostAssignedIncidentsData[3].Name, y: parseInt(MostAssignedIncidentsData[3].Count), color: {
        linearGradient:  [0, 0, 0, 300],
        stops: [
            [0, 'rgba(230,255,46,1)'],
            [1, 'rgba(160,157,53,1)']           
        ]
      }  },
      { name: MostAssignedIncidentsData[4].Name, y: parseInt(MostAssignedIncidentsData[4].Count), color: {
        linearGradient:  [0, 0, 0, 300],
        stops: [
            [0, 'rgba(104,255,38,1)'],
            [1, 'rgba(46,139,44,1)']           
        ]
      }  }  
  ];

  }
  catch(err){
    console.log("error", err);
  }

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

    return (
      <div className="col s12 m12 l6 widget">
        <div className="">
          <h5> Most Assigned To Users</h5>
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    );
}


const mapStateToProps = (state) => {        
  return{   
      userId :state.userLogin.userId,  // logged in User Id  
      MostAssignedIncidentsData: state.dashboard.MostAssignedIncidentsData
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
