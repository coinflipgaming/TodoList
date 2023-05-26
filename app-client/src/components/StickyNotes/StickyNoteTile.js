import React, { useState, useEffect } from 'react'

export default function StickyNoteTile(props) {

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
            <div className="content">{props.content}</div>
            <button className="deleteButton" onClick={fetchDeleteNote}>✖</button>
        </div>
    )
}