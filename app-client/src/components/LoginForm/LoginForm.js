import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import './LoginForm.css'

async function loginUser(credentials) {
    return fetch('http://localhost:8080/', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
        ustaw_err(token)
    }

    function ustaw_err(cos) {
        let error_msg = ""
        if (!cos) {
            error_msg = "zĹ‚y login lub hasĹ‚o"
        }
        document.getElementById('err_message_p').innerHTML = error_msg
    }

    return (
        <div className="LoginForm">
        <div id="log">
            <h1>Zaloguj się</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Nazwa uĹĽytkownika</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>HasĹ‚o</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Log in</button>
                </div>
                <p id="err_message_p"></p>
                </form>
            </div>
        </div>
    )
}

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
};