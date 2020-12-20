import {React , useRef, useEffect, useState} from 'react'
import PageActions from "../PageActions";
import M from 'materialize-css';
import {  useHistory  } from 'react-router-dom'

export default function AddNew() {

    const dueDateTime = useRef();
    const dueDateDate = useRef();
    const startTimeTime = useRef();
    const startTimeDate = useRef();
    const filesTextRef = useRef();

    const history = useHistory();

    const [files , setFiles] = useState(null);

    useEffect(() => {
        M.Datepicker.init(startTimeDate.current);
        M.Timepicker.init(startTimeTime.current);
        M.Datepicker.init(dueDateDate.current);
        M.Timepicker.init(dueDateTime.current);        
    });

   const onFileChange = event => {    
        console.log(event.target.files.length);    
        if(event.target.files.length > 3){
            alert("You can only attach upto 3 files. All extra files will be ignored.");           
          //filesTextRef.current.value = "";           
        }
        setFiles(event.target.files);
      }; 

      const cancelClick = (event) => {
          event.preventDefault();
          history.goBack();
          console.log(history);
      }

    return (
      <>
        <PageActions Title={"Add new Incident"} />
        <section>
          <div className="container">
            <div className="row">
              <div className="col s12 l10 offset-l1">
                <form>
                  <div className="input-field">
                    <input type="text" id="title" />
                    <label htmlFor="title" className="">
                      Title
                    </label>
                  </div>

                  <div className="input-field">
                    <textarea
                      id="description"
                      className="materialize-textarea"
                    ></textarea>
                    <label htmlFor="description" className="">
                      Description
                    </label>
                  </div>

                  <div className="input-field">
                    <textarea
                      id="additionalDetails"
                      className="materialize-textarea"
                    ></textarea>
                    <label htmlFor="additionalDetails" className="">
                      Additional Details
                    </label>
                  </div>

                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        type="text"
                        id="startTimeDate"
                        className="datepicker"
                        ref={startTimeDate}
                      />
                      <label htmlFor="startTimeDate" className="">
                        When the problem started (Pick Date)
                      </label>
                    </div>

                    <div className="input-field col s6">
                      <input
                        type="text"
                        id="startTimeTime"
                        className="timepicker"
                        ref={startTimeTime}
                      />
                      <label htmlFor="startTimeime" className="">
                        When the problem started (Pick Time)
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s6">
                      <input
                        type="text"
                        id="dueDateDate"
                        className="datepicker"
                        ref={dueDateDate}
                      />
                      <label htmlFor="dueDateDate" className="">
                        Due Date (Pick Date)
                      </label>
                    </div>

                    <div className="input-field col s6">
                      <input
                        type="text"
                        id="dueDateTime"
                        className="timepicker"
                        ref={dueDateTime}
                      />
                      <label htmlFor="dueDateTime" className="">
                        Due Date (Pick Time)
                      </label>
                    </div>
                  </div>

                  <div className="file-field input-field">
                    <div className="btn indigo darken-2">
                      <i className="material-icons ">attachment</i>
                      <input type="file" id="attachment" multiple  onChange={onFileChange}/>
                    </div>
                    <div className="file-path-wrapper">
                      <input
                        className="file-path validate"
                        type="text"
                        placeholder="Upload upto 3 files"
                        ref={filesTextRef}
                      />
                    </div>
                  </div>

                  <div className="input-field ">
                    <button className="btn green darken-2 left">
                      <span>Save</span>
                      <i className="material-icons right">save</i>
                    </button>

                    <button className="btn yellow darken-4 left" onClick={cancelClick}>
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
