import React, { useState, useEffect } from 'react'
import './App.css'
import Notes from './components/Notes/Notes.js'


function App() {

    /*function AddKafelek(e) { <---------------musi tworzy� nowy component
        const el = document.createElement('div');

        el.addEventListener('click', function handleClick(event) {
            console.log('Utworzono nowy kafelek', event);
        });

        el.textContent = 'Nazwa'


        el.style.backgroundColor = '#424242';
        el.style.textAlign = 'center'
        el.style.width = '200px';
        el.style.height = '100px';
        el.style.borderRadius = '10px';
        el.style.borderStyle = 'solid';
        el.style.margin = '20px';
        el.style.color = 'white';
        el.style.float = 'left'

        const box = document.getElementById('kafelek');
        box.appendChild(el);
    };*/

    return (
        <div className="App">
            <div id="lewo">
                <form>
                    <input type="text"></input>
                </form>
            </div>

            <div id="srodek">
                <div id="gora">
                    <select id="priorytet">
                        <option>Data↓</option>
                        <option>Data↑</option>
                        <option>Piorytet↓</option>
                        <option>Priorytet↑</option>
                    </select>
                    <button type="button" id="logowanie">Zaloguj się</button>
                    <input type="range" min="1" max="255" id="size"></input>
                </div>

                <Notes />
            </div>


            <div id="prawo">
                <h2>Notatki</h2>
                <div id="notki">
                    <button type="button" id="done1">✔</button>
                    <button type="button" id="delete2">✖</button>
                </div>
            </div>

        </div>
    );
}

export default App;
