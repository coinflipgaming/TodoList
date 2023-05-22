import React, { useState, useEffect } from 'react'
import NoteTile from './NoteTile.js'
import './Notes.css'

export default function Notes({ notes, setNotes, setView }) {
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

    var sortdirection = true; //if true ↑ else ↓

    function sortNotes() {
        //TODO
    }

    function sortDirection() {
        sortdirection = !sortdirection
    }

    return (
        <div className="Notes">
            <header>
                <select id="TypeSelect">
                    <option value="date">data</option>
                    <option value="title">tytuł</option>
                    <option value="priority">priorytet</option>
                </select>
                <div className="sortDirection" onClick={sortDirection()} id="reverse">↑</div>
                <h2>Questy</h2>

                <input type="range" min="100" max="500" id="notesize" />
                

            
            </header>
            {notes.length > 0 && (
                <ul>
                    {notes.map(note => (
                        <div class={note.deadline == 0 ? "red" : "blue"}>
                            <NoteTile setView={setView} key={note.rowid}
                            author_nickname={note.author_nickname}
                            contributors_nicknames={note.contributors_nicknames}
                            date_added={note.date_added}
                            deadline={note.deadline}
                            description={note.description}
                            priority={note.priority}
                            rooms={note.rooms}
                            rowid={note.rowid}
                            title={note.title}
                            >
                            </NoteTile>
                        </div>
                        
                    ))}
                    <div id="add">
                    Dodaj notatke
                    </div>
                </ul>
            )}
        </div>
    )
}