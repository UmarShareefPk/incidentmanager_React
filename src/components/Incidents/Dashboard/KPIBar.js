import React from 'react'
import KPI from './KPI';
import '../../../styles/kpibar.css'

function KPIBar() {
    return (
      <div class="row kpibar">
       
        <KPI value={100} text="NEW" color="orange darken-2" />
        <KPI value={500} text="IN PROGRESS" color="indigo darken-4" />
        <KPI value={100} text="CLOSED" color="green darken-1" />
        <KPI value={100} text="APPROVED" color="green darken-4" />
        <KPI value={100} text="LATE" color="red darken-4"/>
        <KPI value={100} text="ASSINGED TO YOU" color="pink darken-1"/>        
      </div>
    );
}

export default KPIBar
