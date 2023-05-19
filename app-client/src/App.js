import React, { useState, useEffect } from 'react'
import './App.css'
import Notes from './components/Notes/Notes.js'
import StickyNotes from './components/StickyNotes/StickyNotes.js'
import NoteView from './components/NoteView/NoteView.js'
import LoginForm from './components/LoginForm/LoginForm.js'


function App() {
    const [token, setToken] = useState(false);
    const [notes, setNotes] = useState([])
    const [view, setView] = useState(
        {
            "author_nickname":"",
            "contributors_nicknames":"",
            "date_added":"11-05-2023",
            "deadline":"12-05-2024",
            "description":"-",
            "priority":3,
            "rooms":"203",
            "rowid":3,
            "title":"tytuł"
        });

    /*useEffect(() => {
        console.log(view)
    },[view])*/

    //return login form
    if (!token || token === false) {
        return <LoginForm setToken={ setToken } />
    }

    //return basic website if logged in
    return (
        <div className="App">

            <NoteView view={view} setView={setView} token={token} />

            <Notes notes={notes} setNotes={setNotes} setView={setView} />

            <StickyNotes />

        </div>
    )
}

export default App;
