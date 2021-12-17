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
    useEffect(() => {
        getMessagesByUser(userId);
        
    }, [])
       
    
    return (
        <section>
            <div className="container messages-window">
                <div className="row">
                    <div className="col s6 l3 users">
                        <ul>
                            <User></User>
                            <User></User>
                            <User></User>
                            <User></User>
                        </ul>
                    </div>
                    <div className="col s6 l9">
                        messages
                    </div>

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
                      <button type="button" title={"Umar Shareef"} className="btn-floating  blue darken-3 userWelcome" >
                          {"Umar Shareef".split(/\s/).reduce((response, word) => response += word.slice(0, 1), '')}
                      </button>
                  </div>
                  <div>
                      <div className='name'>Umar Shareef</div>
                      <div className='last-message'>last message
                          <span className='date-time'>22 Dec</span>
                      </div>
                  </div>
              </div>
              <hr></hr>

          </li>
      )
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Messages);