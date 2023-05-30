import React, { useState, useEffect } from 'react'

export default function StickyNoteTile(props) {

    const [content, setContent] = useState(" ")

    useEffect(() => {
        setContent(props.content)
    }, [props.content],[])
    useEffect(() => {
        fetchModifyNote() 
    }, [content])

    function fetchModifyNote() {
        fetch('http://localhost:8080/sticky_notes/modify', {
            method: 'post',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "username": props.token.username,
                "password": props.token.password
            },
            body: JSON.stringify({
                "rowid": props.rowid,
                "content": content,
                "priority": 1,
                "date_added": new Date().toISOString().slice(0, 10)
            })
        })}

    const fetchDeleteNote = async () => {
        const response = await fetch('http://localhost:8080/sticky_notes/delete', {
            method: 'delete',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "username": props.token.username,
                "password": props.token.password
            },
            body: JSON.stringify({
                "rowid": props.rowid
            })
        }).then(() => {
            props.refresh()
        })
    }

    return (
        <div className="StickyNoteTile">
            <textarea className="content" value={content} onChange={(e) => { setContent(e.target.value)} } />
            <button className="deleteButton" onClick={fetchDeleteNote}>✖</button>
        </div>
    )
}