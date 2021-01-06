import {React, useState, useEffect, useRef} from 'react';
import M from 'materialize-css';




export default function Pages({TotalPages, PostsPerPage, setPageNumber, setPageSize , search }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentSize, setCurrentSize] = useState(5);

    const ddlRef = useRef();

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

    const pageSizeChanged = (pSize) => {
        setPageSize(pSize);
        setCurrentSize(pSize);
        setCurrentPage(1);
        setPageNumber(1);
    }

    useEffect(() => {
        setCurrentPage(1);
        setPageNumber(1);        
        M.FormSelect.init(ddlRef.current); 
    }, [search])

    pages = pages.map((p,index)=>{
        let pclass = currentPage === p ? "active" : "";        
        return (             
            <li className={pclass} key={p}  onClick={() => pageNumberClick(p)}>              
              <a > {p} </a>
            </li>        
        );
    });
  
    return (
        
      <div className="row pagesRow">
        <div className="input-field col s12 m4 l4">
                            <select value={currentSize} onChange={(e) => pageSizeChanged(e.target.value)}
                             ref={ddlRef}  >						
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                                <option value="40">40</option>
                                <option value="45">45</option>
                                <option value="50">50</option>
                            </select>	
                        <label>Page Size</label>						
        </div>
        <div className="input-field col s12 m8 l8">
            <ul className="pagination right">
            <li
                className={  currentPage === 1 ? " disabled" : "" } >
                <a href="#!" onClick={() => pageNumberClick(currentPage - 1)}>
                <i className="material-icons">chevron_left</i>
                </a>
            </li>
            {pages}
            <li
                className={ currentPage === pages.length ? " disabled" : "" } >
                <a href="#!" onClick={() => pageNumberClick(currentPage + 1)}>
                <i className="material-icons">chevron_right</i>
                </a>
            </li>
            </ul>
        </div>
      </div>
    );
}
