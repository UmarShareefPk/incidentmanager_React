import {React, useState, useEffect, useRef} from 'react';
import M from 'materialize-css';




export default function Pages({TotalRecords, PostsPerPage, setPageNumber, setPageSize , search }) {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentSize, setCurrentSize] = useState(5);

    let hidePreviousPages = false;
    let hideNextPages = false;

    const ddlRef = useRef();

    let pageIndexes = [];
    for(let i = 1; i <= Math.ceil(TotalRecords / PostsPerPage) ; i++ )
    {
        if(i > currentPage - 3 &&  i < currentPage + 3)
        pageIndexes.push(i);        
    }

    if(pageIndexes[0] != 1){
        hidePreviousPages = true;      
    }

    if(pageIndexes[pageIndexes.length -1] != Math.ceil(TotalRecords / PostsPerPage)){
        hideNextPages = true;      
    }

    const pageNumberClick = (event, p) =>{
        event.preventDefault();
        if(p <1 || p > Math.ceil(TotalRecords / PostsPerPage))
            return;
            console.log(p);
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

    let pages = pageIndexes.map((p,index)=>{
        let pclass = currentPage === p ? "active" : "";        
        return (             
            <li className={pclass} key={p}  onClick={(e) => pageNumberClick(e, p)}>              
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
                <a href="#!" onClick={(e) => pageNumberClick(e ,currentPage - 1)}>
                <i className="material-icons">chevron_left</i>               
                </a>
            </li>
            {hidePreviousPages? <li><a>...</a></li> : null} 
            {pages}
            {hideNextPages? <li><a>...</a></li> : null} 
            <li
                className={ currentPage === Math.ceil(TotalRecords / PostsPerPage) ? " disabled" : "" } >
                <a href="#!" onClick={(e) => pageNumberClick(e, currentPage + 1)}>
                <i className="material-icons">chevron_right</i>
                </a>
            </li>
            </ul>
        </div>
      </div>
    );
}
