import {React , useRef, useEffect, useState} from 'react';
import PageActions from "../PageActions";
import M from 'materialize-css';
import {  useHistory  } from 'react-router-dom';
import { connect } from 'react-redux';
import { addNewUser } from '../../store/actions/usersActions';


 function AddUser({addNewUser}){


    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");  
    const [phone, setPhone] = useState("");  
    const [profilePic , setProfilePic] = useState(null);

    const [formError, setFormError] = useState("");

    useEffect(() => {     
       
      
    }, []);

   const onFileChange = (event) => {    
     
    setProfilePic(event.target.files);
   };

   const cancelClick = (event) => {
     event.preventDefault();
     history.goBack();
     //console.log(history);
   };

   const validateForm = () => {

    if(firstName === "" || lastName === "" || email === ""  || phone === "" )
        return false;
    return true;

   }

   const saveClick = (event) => {
    event.preventDefault();     
    if(!validateForm()){
      setFormError("Please complete required fields before saving.")
      return;
    }
    
    setFormError("");
   
   
    const formData = new FormData(); 

    if(profilePic){
       
          formData.append( 
            "Attachment1", 
            profilePic[0], 
            profilePic[0].name 
          );
          }
     formData.append("FirstName", firstName); 
     formData.append("LastName", lastName);
     formData.append("Email", email); 
     formData.append("Phone", email); 
     addNewUser(formData);
  }; 

 
    return (
      <>
        <PageActions Title={"Add new User"} />
        <section>
          <div className="container">
            <div className="row">
              <div className="col s12 l10 offset-l1">
                <form>
                  <div className="row">
                    <div className="col s12 l6">
                      <div className="input-field ">
                        <input
                         className="validate"
                          required
                          type="text"
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label htmlFor="firstName">First Name</label>
                      </div>
                    </div>

                    <div className="input-field col s12 l6">                    
                        <input
                            className="validate"
                            required
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            />
                            <label htmlFor="lastName">Last Name</label> 
                    </div>
                                      
                  </div>
                  <div className="input-field">
                         <input
                            className="validate"
                            required
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                            <label htmlFor="email">Email</label> 
                  </div>

                  <div className="input-field">
                         <input
                            className="validate"
                            required
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            />
                            <label htmlFor="phone">Phone</label> 
                  </div>

                  <div className="file-field input-field">
                    <div className="btn indigo darken-2">
                      <i className="material-icons ">attachment</i>
                      <input
                        type="file"
                        id="attachment"                        
                        onChange={onFileChange}
                      />
                    </div>
                    <div className="file-path-wrapper">
                      <input
                        className="file-path validate"
                        type="text"
                        placeholder="Upload profile picture"
                      />
                    </div>
                  </div>
                  
                  <div className="input-field">
                      <p className="red-text center">{formError ? formError : "" }</p>
                  </div>

                  
                  <div className="input-field ">
                    <button
                      className="btn green darken-2 left"
                      onClick={saveClick}
                    >
                      <span>Save</span>
                      <i className="material-icons right">save</i>
                    </button>

                    <button
                      className="btn yellow darken-4 left"
                      onClick={cancelClick}
                    >
                      <span>Cancel</span>
                      <i className="material-icons right">cancel</i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

const mapStateToProps = (state) => {        
    return{
        allAssignees : state.users.users,
        user_Name :state.userLogin.user_Name, // Logged in User's name
        userId :state.userLogin.userId,  // logged in User Id       
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {       
        addNewUser : (formData) => dispatch(addNewUser(formData))
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
