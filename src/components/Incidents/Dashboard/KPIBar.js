import React,{useEffect, useState} from 'react'
import '../../../styles/kpibar.css'
import { GetKPI } from '../../../store/actions/dashboardActions';
import { connect } from 'react-redux';

function KPIBar({getKPIData, userId, kpiData}) {
 
  //console.log("kpiData",kpiData);
  
  useEffect(() => {    
    getKPIData(userId); 
  }, [])

 
    return (     
      <div class="row kpibar">       
        <KPI value={kpiData.New} text="NEW" color="orange darken-2" />
        <KPI value={kpiData.InProgress} text="IN PROGRESS" color="blue darken-2" />
        <KPI value={kpiData.Closed} text="CLOSED" color="green darken-1" />
        <KPI value={kpiData.Approved} text="APPROVED" color="green darken-4" />
        <KPI value={kpiData.Late} text="LATE" color="red darken-4"/>
        <KPI value={kpiData.AssignedToMe} text="ASSINGED TO YOU" color="indigo darken-4"/>        
      </div>
    );
}

function KPI({value, text, color}) {
  return (
    <div className="col l2 m6 s6">
      <div className={"kpi " + color}  >
        <div className="kpi-value">{value}</div>
        <div className="kpi-text">{text}</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {        
  return{   
      userId :state.userLogin.userId,  // logged in User Id  
      kpiData: state.dashboard.KPIData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      getKPIData : (userId) => dispatch(GetKPI(userId)),     
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KPIBar);

