import React from 'react'

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

export default KPI
