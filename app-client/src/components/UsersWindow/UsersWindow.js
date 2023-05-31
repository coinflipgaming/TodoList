import React,{ useEffect, useState } from 'react'
import './UsersWindow.css'

export default function UsersWindow(props) {

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [nickname, setNickname] = useState("")
    const [password, setPassword] = useState("")

    const[users, setUsers] = useState([])

    useEffect(() => {
        setUsers(props.users)
    },[props.users])

    return (
        <div className="UsersWindow">
            <h2>Użytkownicy</h2><div onClick={handleClick1}>x</div>
            <form>
                <label for="name_inpt">Imie</label>
                <input id="name_inpt" value={name} onChange={(e) => { setName(e.target.value) }} />
                <br />
                <label for="surname_inpt">Nazwisko</label>
                <input id="surname_inpt" value={surname} onChange={(e) => { setSurname(e.target.value) }} />
                <br />
                <label for="nickname_inpt">Login</label>
                <input id="nickname_inpt" value={nickname} onChange={(e) => { setNickname(e.target.value) }} />
                <br />
                <label for="password_inpt">Hasło</label>
                <input id="password_inpt" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <br />
                <div className="addbtn" onClick={fetchAddUser}>Dodaj</div>
            </form>
            <table>
                {users.length > 0 &&
                    <>
                    <tr>
                        <td>Imie</td>
                        <td>Nazwisko</td>
                        <td>Nazwa Użytkownika</td>
                        <td>hasło</td>
                    </tr>
                    {users.map(user => (
                        <ul>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.nickname}</td>
                            <td>{user.password_raw}</td>
                            <td className="delbtn" onClick={() => {
                                fetch('http://localhost:8080/users/delete', {
                                    mode: 'cors',
                                    method: 'delete',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        "username": props.token.username,
                                        "password": props.token.password
                                    },
                                    body: JSON.stringify({
                                        "rowid": user.rowid
                                    })
                                })
                                props.refreshUsers()
                            }}>x</td>
                        </ul>
                    ))}
                    </>
                }
            </table>
        </div>
    )
    function handleClick1(){
        props.setDisplayUsers(false)
    }
    function fetchAddUser() {
        fetch('http://localhost:8080/users/add', {
            mode: 'cors',
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "username": props.token.username,
                "password": props.token.password
            },
            body: JSON.stringify({
                "newName":name,
                "newSurname":surname,
                "newUsername":nickname,
                "newPassword":password
            })
        })
        props.refreshUsers()
    }
}