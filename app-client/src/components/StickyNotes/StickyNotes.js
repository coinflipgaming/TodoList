import React, { useState, useEffect } from 'react'
import StickyNoteTile from './StickyNoteTile.js'
import './StickyNotes.css'

export default function StickyNotes({token}) {
    const [stickyNotes, setStickyNotes] = useState([])

    const fetchData = async () => {
        const response = await fetch('http://localhost:8080/sticky_notes', {
            mode: 'cors',
            headers: {
                "username": token.username,
                "password": token.password
            }
        }).then((res) => {
            setStickyNotes(res.json().then(data => {
                setStickyNotes(data)
            }))
        })
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="StickyNotes">
            {stickyNotes.length > 0 && (
                <ul>
                    {stickyNotes.map(note => (
                        <StickyNoteTile key={note.rowid} content={note.content}></StickyNoteTile>
                    ))}
                    <div id="add1">
                    Dodaj Notatke
                    </div>
                </ul>
            )}
        </div>
    )
}