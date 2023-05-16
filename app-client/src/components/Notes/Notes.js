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

    function sortDirection() {
        document.getElementById("reverse").innerHTML = '↓';
    }

    const handleClick = event => {
        if (event.currentTarget.style.backgroundColor) {
            event.currentTarget.style.backgroundColor = null;
            event.currentTarget.style.color = null;
        } else {
            event.currentTarget.style.backgroundColor = 'salmon';
            event.currentTarget.style.backgroundColor = 'black';
        }
    };

    return (
        <div className="Notes">
            <header>
                <select id="TypeSelect">
                    <option value="date">data</option>
                    <option value="title">tytuł</option>
                    <option value="priority">priorytet</option>
                </select>
                <div class="sortDirection" onClick={sortDirection != sortDirection} id="reverse">↑</div>
                <h2>Questy</h2>

                <input type="range" min="1" max="255" onChange={changeSize()}/>
                

            
            </header>
            {notes.length > 0 && (
                <ul>
                    {notes.map(note => (
                        <NoteTile key={note.rowid} title={note.tytul} description={note.description}></NoteTile>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Notes