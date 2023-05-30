import React, { useState, useEffect } from 'react'
import './App.css'
import Notes from './components/Notes/Notes.js'
import StickyNotes from './components/StickyNotes/StickyNotes.js'
import NoteView from './components/NoteView/NoteView.js'
import LoginForm from './components/LoginForm/LoginForm.js'

function App() {
    const [token, setToken] = useState(false);
    const [notes, setNotes] = useState([])
    const [viewMode, setViewMode] = useState("")
    const [view, setView] = useState();

    useEffect(() => {
        setView({
                "author_nickname": "",
                "contributors_nicknames": token.name + " " + token.surname,
                "date_added": new Date().toISOString().slice(0, 10),
                "deadline": new Date().toISOString().slice(0, 10),
                "description": "nowy opis",
                "priority": 1,
                "rooms": "",
                "rowid": 0,
                "title": "nowy tytuł"
            })
    },[token])

    function refreshNotes(){
        fetch('http://localhost:8080/notes', {
            mode: 'cors',
            headers: {
                "username": token.username,
                "password": token.password,
                "name": token.name,
                "surname": token.surname
            }
        }).then((res) => {
            setNotes(res.json().then(data => {
                setNotes(data)
            }))
        })
    }

    //return login form
    if (!token || token.auth === false) {
        return <LoginForm setToken={ setToken } />
    }

    //return basic website if logged in
    return (
        <div className="App">

            <NoteView refreshNotes={refreshNotes} view={view} token={token} viewMode={viewMode}/>

            <Notes token={token} setToken={setToken} notes={notes} setNotes={setNotes} setView={setView} setViewMode={setViewMode}/>

            <StickyNotes token={token} />

        </div>
    )
}

export default App;
