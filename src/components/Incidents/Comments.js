import { React, useEffect, useState, useRef } from "react";
import moment from "moment";
import {  useHistory  } from 'react-router-dom';
import Comment from "./Comment";
import { connect } from "react-redux";
import {  addNewComment } from "../../store/actions/incidentsActions";

function Comments({
  incidentId,
  comments,
  userId,
  getNameById,
  addNewComment
}) {
  const [newComment, setNewComment] = useState("");
  const [newCommentFiles, setNewCommentFiles] = useState(null);

  const newCommentFilesRef = useRef();
  const history = useHistory();
  //console.log(history);
  const onFileChange = (event) => {
    setNewCommentFiles(event.target.files);
  };

  const saveComment = () => {
    if (newComment.trim() === "") {
      alert("Please add comment first.");
      return;
    }
    const formData = new FormData();

    if (newCommentFiles) {
      for (let i = 0; i < newCommentFiles.length; i++) {
        formData.append(
          "Attachment" + i + 1,
          newCommentFiles[i],
          newCommentFiles[i].name
        );
      }
    }
    formData.append("CommentText", newComment.trim());
    formData.append("IncidentId", incidentId);
    formData.append("UserId", userId);
    addNewComment(formData);

    setNewComment("");
    setNewCommentFiles(null);
    newCommentFilesRef.current.value = "";
    //history.push(history.location.pathname);
  };

  return (
    <>
      <h5 className="heading left-align">Comments</h5>
      <p className="all-comments-box">
        {!comments ? (
          <h1>No Comments</h1>
        ) : (
          comments.map((comment) => {
            return (
              <Comment
                key={comment.Id}
                comment={comment}
                getNameById={getNameById}
                incidentId={incidentId}
                userId={userId}               
              />
            );
          })
        )}{" "}
        {/* end of comments loop */}
      </p>

      <h6 className="heading indigo-text darken-4 left-align">Add Comment</h6>
      <div className="input-field">
        <textarea
          id="comment"
          className="materialize-textarea"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <label for="comment" className="">
          Comment
        </label>
      </div>
      <div className="file-field input-field">
        <div className="btn indigo darken-2">
          <i className="material-icons ">attachment</i>
          <input type="file" id="attachment" multiple onChange={onFileChange} />
        </div>
        <div className="file-path-wrapper">
          <input
            className="file-path validate"
            ref={newCommentFilesRef}
            type="text"
            placeholder="Upload upto 3 files"
          />
        </div>
      </div>

      <div className="input-field center ">
        <button
          className="left btn green darken-2 updateBtn"
          onClick={saveComment}
        >
          <span>Add</span>
          <i className="material-icons right">save</i>
        </button>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    allAssignees: state.users.users,
    incidentData: state.incidents.IncidentSelected,
    userId :state.userLogin.userId,  // logged in User Id       
  };
};

const mapDispatchToProps = (dispatch) => {
  return {    
    addNewComment: (formData) => dispatch(addNewComment(formData))    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
