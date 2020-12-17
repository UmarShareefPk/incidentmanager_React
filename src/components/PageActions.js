import React from 'react'

export default function PageActions(props) {
    return (
        <section className="container titleBar">
        <div className="row ">
          <div className="col s12">
            <div className="left">
              <h4 className="title">{props.Title}</h4>
            </div>
            <div className="right">
              <ul>
                <li>
                  <a className="btn-floating green">
                    <i className="material-icons">refresh</i>
                  </a>
                </li>
                <li>
                  <a className="btn-floating red">
                    <i className="material-icons">print</i>
                  </a>
                </li>
                <li>
                  <a className="btn-floating blue">
                    <i className="material-icons">file_download</i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
}
