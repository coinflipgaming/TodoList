import React, { useState, useEffect } from 'react'
import './NoteView.css'

class NoteView extends React.Component {
    render() {
        return (
            <div className="NoteView">
                <div>Tytuł</div>
                <div>Content</div>
            </div>
        )
    }
}

export default NoteView