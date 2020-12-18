import {React, useState} from 'react'
import { NavLink } from 'react-router-dom';

export default function Pages({TotalPages, PostsPerPage, setPageNumber }) {

    const [currentPage, setCurrentPage] = useState(1);

    let pages = [];
    for(let i = 1; i <= Math.ceil(TotalPages / PostsPerPage) ; i++ )
    {
        pages.push(i);
    }

    const pageNumberClick = (p) =>{
        if(p <1 || p > pages.length)
            return;

        setPageNumber(p);
        setCurrentPage(p);
    }

    pages = pages.map((p,index)=>{
        let pclass = currentPage === p ? "waves-effect active" : "waves-effect" 
        return (             
            <li className={pclass} key={p}  onClick={() => pageNumberClick(p)}>              
              <a > {p} </a>
            </li>        
        );
    });

    return (
      <ul className="pagination right">
         <li className = {currentPage === 1? "waves-effect disabled" : "waves-effect"} >
          <a href="#!" onClick= { () => pageNumberClick(currentPage - 1)}>
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
        
        {pages}
        
        <li className = {currentPage === pages.length? "waves-effect disabled" : "waves-effect"}>
          <a href="#!"  onClick= { () => pageNumberClick(currentPage + 1)}>
            <i className="material-icons">chevron_right</i>
          </a>
        </li> 
      </ul>
    );
}
