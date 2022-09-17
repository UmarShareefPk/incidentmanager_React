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
      <div className="card">
        <div className="card-content">
          <div className="kpi-bar">
            <div className="kpi-group">
              <KPI value={kpiData.New} text="NEW" color="new-color" />
              <KPI value={kpiData.InProgress} text="IN PROGRESS" color="inprogress-color" />
            </div>
            <div className="kpi-group">
              <KPI value={kpiData.Closed} text="CLOSED" color="closed-color" />
              <KPI value={kpiData.Approved} text="APPROVED" color="approved-color" />
            </div><div className="kpi-group">
              <KPI value={kpiData.Late} text="LATE" color="late-color" />
              <KPI value={kpiData.AssignedToMe} text="ASSINGED TO YOU" color="assignedToMe-color" />
            </div></div>
        </div>
      </div>
    );
}

function KPI({value, text, color}) {
  return (   
      <div className={"kpi " + color}  >
        <div className="kpi-value">{value}</div>
        <div className="kpi-text">{text}</div>
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

