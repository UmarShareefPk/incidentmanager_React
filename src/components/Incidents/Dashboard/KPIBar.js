import React from 'react'
import '../../../styles/kpibar.css'

function KPIBar() {
    return (
      <div class="row kpibar">
       
        <KPI value={100} text="NEW" color="orange darken-2" />
        <KPI value={500} text="IN PROGRESS" color="blue darken-2" />
        <KPI value={100} text="CLOSED" color="green darken-1" />
        <KPI value={100} text="APPROVED" color="green darken-4" />
        <KPI value={100} text="LATE" color="red darken-4"/>
        <KPI value={100} text="ASSINGED TO YOU" color="indigo darken-4"/>        
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

export default KPIBar
