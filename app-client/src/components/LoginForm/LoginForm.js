import React, { useState } from 'react';
import PropTypes from 'prop-types'
import './LoginForm.css'
import Logo from '../../images/amw_logo.png'

async function loginUser(credentials) {
    return fetch('http://localhost:8080/', {
        method: 'get',
        headers: {
            'username': credentials.username,
            'password': credentials.password
        }
    }).then(res => res.json())
}

export default function LoginForm({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        })
        setToken(token)
        if (token.auth==false) {
             document.getElementById('err_message_p').innerHTML = "zły login lub hasło!"
        }
        
    }

    return (
        <>
            <img src={Logo} alt="Akademia Marynarki Wojennej Gdynia" className="Logo"/>

            <form className="LoginForm" onSubmit={handleSubmit}>
                <h1>Zaloguj się</h1>

                <label>Nazwa użytkownika</label><br/>
                <input type="text" onChange={e => setUserName(e.target.value)} /><br />
                
                <label>Hasło</label><br />
                <input type="password" onChange={e => setPassword(e.target.value)} /><br />

                <button type="submit">Zaloguj się</button>
                <p id="err_message_p"></p>
            </form>
        </>
    )
}

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
};