import { React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Pages from '../Pages'
import User from './User'
import PageActions from "../PageActions";
import { userssWithPage } from "../../store/actions/usersActions";
import {  useHistory  } from 'react-router-dom'

 function UsersList(props) {

    const [PageNumber, setPageNumber] = useState(1);
    const [PageSize, setPageSize] = useState(5);
    const [Search, setSearch] = useState("");

    const history = useHistory();
    
    useEffect(() => {
        const parameters = {
            PageNumber : PageNumber,
            PageSize : PageSize,
            Search : Search
        }        
        props.userssWithPage(parameters);
        return () => {
            
        }
    }, [PageNumber, PageSize, Search])

    const searchTextChange =   (text) => {      
            setSearch(text);
            setPageNumber(1);
    }

    const addNewClick = ()=>{
      let path = '/AddUser';      
      history.push(path);
    }
    
    if( !props.Users){
      return (
        <div class="preloader-wrapper container big active page-loader">
        <div class="spinner-layer spinner-blue-only">
          <div class="circle-clipper left">
            <div class="circle"></div>
          </div><div class="gap-patch">
            <div class="circle"></div>
          </div><div class="circle-clipper right">
            <div class="circle"></div>
          </div>
        </div>
    </div>
      )
    }
    
    return (
      <>
        <PageActions Title={"Users"} /> 

        <section>
          <div className="container">
            <div className="row">

              <div className="col s6 l6">
                <div className="input-field">                
                  <input type="text"  value={Search}  onChange={(e) => searchTextChange(e.target.value)} />
                  <label htmlFor="search">Search</label>
                </div>
              </div>
              
              <div className="col s6 l6">
                <div className="input-field">              
                  <button className="btn green darken-4 right" onClick={()=>addNewClick()} >
                    <span>Add New</span>
                    <i className="material-icons right">create</i>
                  </button>
                </div>
              </div>

              <div className="col s12 l12">
                <table className="responsive-table highlight incidentsTbl">
                  <thead>
                    <tr className="header" data-target="blue">
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>                      
                      <th>Created Date</th>                     
                    </tr>
                  </thead>
                  <tbody>
                  {
                   !props.Users? null : props.Users.map(user=>{
                          return (
                            <User key={user.Id} user= {user} />                          )
                      })
                  }           
                  </tbody>
                </table>
                <Pages  TotalPages={props.TotalUsers} PostsPerPage={PageSize} setPageNumber={setPageNumber} setPageSize={setPageSize} search={Search} />
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

const mapStateToProps = (state) => {
    return{
        Users : state.users.UsersList,
        TotalUsers : state.users.TotalUsers     
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        userssWithPage: (parameters) => dispatch(userssWithPage(parameters))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(UsersList);