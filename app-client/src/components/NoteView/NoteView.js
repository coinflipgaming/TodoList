import React, { useState, useEffect } from 'react'
import './NoteView.css'

class NoteView extends React.Component {
    render() {
        return (
            <div className="NoteView">
                <div id="title">Create Note</div>

                <div id="frima">
                   <form>
                    Nazwa
                    <input id="tytul">{this.props.tytul}</input><br></br>
                    Opis<br></br>
                    <textarea id="opis">{this.props.description}</textarea>
                    Wybierz Priorytet:  
                    <select id="select1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select><br></br>
                    Wybierz date od
                        <input type="date" id="data"></input>
                        Wybierz deadline
                        <input type="date" id="data"></input><br></br><br></br>
                        <input type="submit" value="submit" id="submit"></input>
                        <input type="reset" value="reset" id="reset"></input>
                    </form>

                </div>
                
            </div>
        )
    }
}

export default NoteView