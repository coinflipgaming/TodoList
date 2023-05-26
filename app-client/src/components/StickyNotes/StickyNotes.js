import React, { useState, useEffect } from 'react'
import StickyNoteTile from './StickyNoteTile.js'
import './StickyNotes.css'

export default function StickyNotes({token}) {
    const [stickyNotes, setStickyNotes] = useState([])
    const [content, setContent] = useState('pusta notatka')
    const [priority, setPriority] = useState(1)

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

    const fetchAddNote = async () => {
        const response = await fetch('http://localhost:8080/sticky_notes/add', {
            method: 'post',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "username": token.username,
                "password": token.password
            },
            body: JSON.stringify({
                "content": content,
                "date_added": new Date().toISOString().slice(0, 10),
                "priority": priority
            })
        }).then(() => {
            fetchData()
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
                        <StickyNoteTile token={token} key={note.rowid} rowid={note.rowid} content={note.content} refresh={fetchData}></StickyNoteTile>
                    ))}
                    <div id="add1">
                        <input placeholder="Dodaj notatkę" type="text" value={content} onChange={(e) => { setContent(e.target.value) }} />
                        <button onClick={fetchAddNote}>+</button>
                    </div>
                </ul>
            )}
        </div>
    )
}