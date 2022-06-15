import React, { useEffect } from "react";
// import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
// import ReactMarkdown from "react-markdown";

import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

import "./MynoteStyles.css"

function MyNotes({ history, search }) {
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <MainScreen title="Welcome to freeCodeCamp.org">
    <div className="quote">
    <h4 className="quote-line">"I have not failed. I've just found 10,000 ways that wont work."</h4>
    <h5 className="author"> - <em>Thomas A. Edison</em></h5>
    </div>
      {console.log(notes)}

      {/* {userInfo.isAdmin &&  */}
      <Link to="/createnote">
        <button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new
        </button>
      </Link>
      {/* } */}
      
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
       
      {notes &&
        notes
          .filter(
            (filteredNote) =>
              filteredNote.title.toLowerCase().includes(search.toLowerCase()) ||
              filteredNote.category.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note) => (
            <>
              <div 
                style={{ 
                  margin: "10px 40px", 
                  padding:"20px 15px",
                  backgroundColor:"#d1d0d5",
                  border:"3px solid #040320",
                }} 
                key={note._id}>
                <div style={{ display: "flex" }}>
                  <span
                    // onClick={() => ModelShow(note)}
                    style={{
                      color: "black",
                      textDecoration: "none",
                      fontFamily: "Roboto Mono",
                      fontWeight:'thin',
                      textAlign: 'left', 
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 20,
                    }}
                  >

                      {note.title}

                  </span>
                  {/* {userInfo.isAdmin && */}
                  <div>
                    {/* <button href={`/note/${note._id}`}>Edit</button> */}
                    <button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </button>
                  </div>
                  {/* } */}
                </div>
               
              </div>
            </>
          ))}
    </MainScreen>
  );
}

export default MyNotes;
