import React, { useState, useEffect } from 'react'
import NoteTile from './NoteTile.js'
import './Notes.css'

const Notes = () => {
    const [notes, setNotes] = useState([])

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/notes', {
            mode: 'cors',
            headers: {
                "username": "asinatio",
                "password": "haslo"
            }
        }).then((res) => {
            setNotes(res.json().then(data => {
                setNotes(data)
                console.log(data)
            }))
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    var sortDirection = true; //if true ↑ else ↓

    function sortNotes() {
        //TODO
    }

    function changeSize() {
        document.documentElement.style.setProperty('width',200)
    }

    return (
        <div className="Notes">
            <header>
                <select id="TypeSelect">
                    <option value="date">data</option>
                    <option value="title">tytuł</option>
                    <option value="priority">priorytet</option>
                </select>
                <div class="sortDirection" onClick={sortDirection != sortDirection}>↑</div>
                <input type="range" id="rowCount" min="1" max="5" onChange={ changeSize() } />

            </header>
            {notes.length > 0 && (
                <ul>
                    {notes.map(note => (
                        <NoteTile key={note.rowid} title={note.title} description={note.description}></NoteTile>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Notes