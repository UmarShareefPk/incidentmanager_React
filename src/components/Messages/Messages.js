import { React, useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { messagesByUser } from "../../store/actions/messagesActions";
import SendMessage from './SendMessage';
import '../../styles/messages.css';

function Messages({
    userId,
    allUsers,
    UserMessages,
    getMessagesByUser
}) {

    const [userToggle, setUserToggle] = useState(false);

    useEffect(() => {
        getMessagesByUser(userId);
        
    }, []);
       
    
    return (
        <section>
            <div className="container messages-window">     

                <div className="row">
                    <div className="col s2 m3 hide-on-large-only">
                        <div className="user-toogle" onClick={()=>setUserToggle(!userToggle)}>
                            <span>Users</span>
                            <i className="material-icons center">send</i>
                        </div> 
                    </div>
                    {userToggle? (
                         <div className="col s10 m9 l3 users hide-on-large-only">
                         <ul>
                             <User></User>
                             <User></User>
                             <User></User>
                             <User></User>
                         </ul>
                     </div>
                    ) : <></>}
                   

                    <div className="col s10 m9 l3 users hide-on-med-and-down">                        
                        <ul>
                            <User></User>
                            <User></User>
                            <User></User>
                            <User></User>
                        </ul>
                    </div>
                    {!userToggle? (
                    <div className="col s10 m9 l9 ">
                        <h5 className="left indigo-text darken-4"> Umar Shareef </h5>
                        <div className="messages">
                        <ul className=''>
                            <Message isSent={true}/>
                            <Message isSent={false}/>
                            <Message isSent={true}/>
                            <Message isSent={false}/>
                            <Message isSent={false}/>
                            <Message isSent={false}/>
                            <Message isSent={true}/>
                        </ul>
                        </div>
                        <NewMessage />
                    </div>

                    ) : <></> }

                </div>
            </div>
        </section>
    )
}

const mapStateToProps = (state) => {
    return{
        userId :state.userLogin.userId, 
        allUsers: state.users.users,
        UserMessages : state.messages.Messages,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        getMessagesByUser: (userId) => dispatch(messagesByUser(userId)),    
    }
  }

  const User = ()=> {
      return (
          <li >
              <div className='user-info'>
                  <div className='photo'>
                      <button type="button" title={"Umar Shareef"} className="btn-floating  red darken-2 userWelcome" >
                          {"Umar Shareef".split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')}
                      </button>
                  </div>
                  <div>
                      <div className='name indigo-text darken-4'>Umar Shareef</div>
                      <div className='last-message'>last message
                          <span className='date-time'>22 Dec</span>
                      </div>
                  </div>
              </div>
              <hr></hr>

          </li>
      )
  }

const Message = ({ isSent }) => {
    return (
        <li className='message-li'>
            <div className='message-time'>2 days ago</div>
            <div className={isSent ? "message left" : "message right"}>
                <div className='message-text'>
                    Yes 1920. Phle os ne wo lgai thi. Main ne pir Toda makhan lgaya. Os ne tea pilai pir kaha k
                </div>
            </div>
        </li>
    )
}

const NewMessage = () => {
    return (
        <div className="new-message-window">
            <div className="input-field">
                <textarea
                    id="comment"
                    className="materialize-textarea"
                    placeholder='Write new message'
                // value={newComment}
                // onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
            </div>
            <div>
                <button
                    className="left btn pink darken-1 updateBtn"
                   // onClick={saveComment}
                >
                    <span>Send</span>
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </div>

    )
}

  
  export default connect(mapStateToProps, mapDispatchToProps)(Messages);