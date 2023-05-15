    import React, { useState, useEffect } from 'react'
    import './NoteView.css'

    class NoteView extends React.Component {
        render() {
            return (
                <div className="NoteView">
                    <div id="title">Create Note</div>
                    <div id="calo">
                    <div id="frima">
                       <form>
                        Nazwa
                            <input id="tytul" value={ this.props.tytul } /><br></br>
                  
                                Wybierz Priorytet:  
                                <select id="select1" value={this.props.priority }>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </select><br></br>
                            Wpisz sale
                            <input value={this.props.room} />
                                Wybierz osobe<br></br>
                                <select id="select2" value={this.props.osoba }>
                                    <option>Jakub Perron</option>
                                    <option>Damian Mika</option>
                                </select><br></br>
                            Wybierz date od
                            <input type="date" id="data" value={this.props.data} />
                            Wybierz deadline
                                <input type="date" id="data" value={this.props.deadline} /><br></br>
                                Opis<br></br>
                                <textarea id="opis">{this.props.opis}</textarea><br></br><br></br>
                            </form>
                            <button type="submit" value="submit" id="submit">Done</button>
                            <button type="reset" value="reset" id="reset">Usun</button>

                        </div>
                    </div>

                
                </div>
            )
        }
    }

    export default NoteView