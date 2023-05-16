import React, { useState, useEffect } from 'react'
import './App.css'
import Notes from './components/Notes/Notes.js'
import StickyNotes from './components/StickyNotes/StickyNotes.js'
import NoteView from './components/NoteView/NoteView.js'
import LoginForm from './components/LoginForm/LoginForm.js'


function App() {
    const [token, setToken] = useState(false);

    //return login form
    if (!token || token == false) {
        return <LoginForm setToken={setToken} />
    }

    //return basic website if logged in
    return (
        <div className="App">

            <NoteView tak="tatkaktka" tytul="Zainstaluj android studio" priority="2" opis="jabadabadu" room="203" osoba="Jakub Perron" data="20.11.2005"/>

            <Notes />

            <StickyNotes />

        </div>
    )
}

export default App;
