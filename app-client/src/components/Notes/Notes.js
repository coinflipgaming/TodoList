import React, { useState, useEffect } from 'react'
import NoteTile from './NoteTile.js'
import './Notes.css'

export default function Notes({ token, notes, setToken, setNotes, setView, setViewMode , setDisplayUsers}) {
    const [sort, setSort] = useState("deadline")
    const [sortdir, setSortdir] = useState("desc")
    
    const fetchNotes = async () => {
        const response = await fetch('http://localhost:8080/notes', {
            mode: 'cors',
            headers: {
                "username": token.username,
                "password": token.password,
                "name": token.name,
                "surname": token.surname,
                "sort": sort,
                "sortdir": sortdir
            }
        }).then((res) => {
            setNotes(res.json().then(data => {
                setNotes(data)
            }))
        })
    }

    useEffect(() => {
        fetchNotes()
    },[sort,sortdir])

    function handleClick1() {
        setViewMode("Add")
        setView({
            "author_nickname": `${token.name} ${token.surname}`,
            "contributors_nicknames": [`${token.name} ${token.surname}`],
            "date_added": new Date().toISOString().slice(0, 10),
            "deadline": new Date().toISOString().slice(0, 10),
            "description": "nowy opis",
            "priority": 1,
            "rooms": "",
            "rowid": 0,
            "title": ""
        })
    }
    function handleClick2() {
        setToken(false)
    }

    return (
        <div className="Notes">
            <header className="nav">
                <select id="TypeSelect" onChange={(e) => { setSort(e.target.value) }}>
                    <option value="date_added">data</option>
                    <option value="title">tytuł</option>
                    <option value="priority">priorytet</option>
                    <option value="deadline">deadline</option>
                </select>
                <button className="sortDirection" onClick={(e) => {
                    handleClick4()
                    e.checked = e.target.checked
                }} id="rotatecheckbox"><p className={sortdir!="desc" ? "" : "rotate"}>↑</p></button>

                <div className="hiuser">Witaj {token.name} !</div>
                <button id="menubutton" onClick={handleClick2}>Wyloguj</button>
                <button id="menubutton" onClick={handleClick3}>Użytkownicy</button>
            </header>
            <div id="notes-wrapper">
            {notes.length > 0 && (
                <>
                    {notes.map(note => (
                        <div key={note.rowid} className={
                            (Date.parse(note.deadline) < (Date.now() - 90000000))
                                ? ""
                                : (Date.parse(note.deadline) < (Date.now() + 86400000))
                                    ? "red"
                                    : "green"
                        }>
                            <NoteTile
                                token={token}
                                setView={setView} 
                                author_nickname={note.author_nickname}
                                contributors_nicknames={note.contributors_nicknames}
                                date_added={note.date_added}
                                deadline={note.deadline}
                                description={note.description}
                                priority={note.priority}
                                rooms={note.rooms}
                                rowid={note.rowid}
                                title={note.title}
                                setViewMode={setViewMode}>
                            </NoteTile>
                        </div>
                    ))}
                </>
            )}
            <div id="add" onClick={handleClick1}>
                <p>Dodaj notatke</p>
            </div>
            </div>
        </div>
    )
    function handleClick4() {
        if (sortdir == "desc") {
            setSortdir("asc")
        }
        else {
            setSortdir("desc")
        }
    }
    function handleClick3() {
        setDisplayUsers(true)
    }
}