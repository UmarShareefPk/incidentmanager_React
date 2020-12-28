import React from 'react'

export default function Comment({comment}) {
   
    return (
      <div className="card">
        <div className="card-content">
          <span className="card-title">Umar Shareef Wrote</span>
          <p>This is a test comment and is static.</p>
          <br></br>
          <p>Files here</p>
          <br></br>
          <p className="right"> Sun Dec 27 2020 12:37:40</p>
        </div>        
      </div>
    );
}
