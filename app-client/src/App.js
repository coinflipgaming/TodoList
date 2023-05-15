import React, { useState, useEffect } from 'react'
import './App.css'
import Notes from './components/Notes/Notes.js'
import StickyNotes from './components/StickyNotes/StickyNotes.js'
import NoteView from './components/NoteView/NoteView.js'


function App() {
    return (
        <div className="App">

            <NoteView />

            <Notes />

            <StickyNotes />

        </div>
    );
}

export default App;
