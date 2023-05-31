import React, { useState, useEffect } from 'react'
import './App.css'
import Notes from './components/Notes/Notes.js'
import StickyNotes from './components/StickyNotes/StickyNotes.js'
import NoteView from './components/NoteView/NoteView.js'
import LoginForm from './components/LoginForm/LoginForm.js'
import UsersWindow from './components/UsersWindow/UsersWindow.js'

function App() {
    const [token, setToken] = useState(false);
    const [notes, setNotes] = useState([])
    const [viewMode, setViewMode] = useState("")
    const [view, setView] = useState();
    const [displayUsers, setDisplayUsers] = useState(false);

    const [users, setUsers] = useState([])

    useEffect(() => {
        console.log(users)
    },[users])

    useEffect(() => {
        setView({
                "author_nickname": `${token.name} ${token.surname}`,
                "contributors_nicknames": [`${token.name} ${token.surname}`],
                "date_added": new Date().toISOString().slice(0, 10),
                "deadline": new Date().toISOString().slice(0, 10),
                "description": "nowy opis",
                "priority": 1,
                "rooms": [],
                "rowid": 0,
                "title": "nowy tytuł"
            })
    },[token])

    function refreshUsers() {
        fetch('http://localhost:8080/users', {
            mode: 'cors',
            headers: {
                "username": token.username,
                "password": token.password
            }
        }).then((res) => {
            setUsers(res.json().then(data => {
                setUsers(data)
            }))
        })
    }

    function refreshNotes() {
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

    if (!token || token.auth === false) {
        return <LoginForm setToken={setToken} />
    }

    return (
        <div className="App">


            <NoteView users={users} setUsers={setUsers} refreshNotes={refreshNotes} view={view} token={token} viewMode={viewMode} refreshUsers={refreshUsers} />

            <Notes setDisplayUsers={setDisplayUsers} token={token} setToken={setToken} notes={notes} setNotes={setNotes} setView={setView} setViewMode={setViewMode}/>

            <StickyNotes token={token} />


            {displayUsers === true &&
                <UsersWindow setUsers={setUsers} token={token} setDisplayUsers={setDisplayUsers} users={users} refreshUsers={refreshUsers} />
            }

        </div>
    )
}

export default App;
