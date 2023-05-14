import React, { useState, useEffect } from 'react'
import NoteTile from '../NoteTile/NoteTile.js'

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
    return (
        <div className="Notes">
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