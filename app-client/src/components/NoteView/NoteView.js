import { useEffect, useState } from 'react'
import './NoteView.css'
import Buttons from './Buttons.js'

export default function NoteView(props) {
    const [title, setTitle] = useState()
    const [priority, setPriority] = useState()
    const [rooms, setRooms] = useState()
    const [author_nickname, setAuthor_nickname] = useState()
    const [contributors_nicknames, setContributors_nicknames] = useState()
    const [date, setDateAdded] = useState()
    const [deadline, setDeadline] = useState()
    const [description, setDescription] = useState()

    const [users, setUsers] = useState({})

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:8080/users', {
            mode: 'cors',
            headers: {
                "username": props.token.username,
                "password": props.token.password
            }
        }).then((res) => { res.json().then(data => {
                setUsers(data)
            })
        })
    }

    useEffect(() => {
        setTitle(props.view.title)
        setPriority(props.view.priority)
        setRooms(props.view.rooms)
        setAuthor_nickname(props.view.author_nickname)
        setContributors_nicknames(props.view.contributors_nicknames)
        setDateAdded(props.view.date_added)
        setDeadline(props.view.deadline)
        setDescription(props.view.description)
        fetchUsers()
    }, [props.view])

    function handleClickModify() {
        fetch('http://localhost:8080/notes/modify', {
            method: 'post',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                'username': props.token.username,
                'password': props.token.password
            },
            body: JSON.stringify({
                "rowid": props.view.rowid,
                "title": title,
                "priority": priority,
                "description": description,
                "rooms": rooms,
                "author_nickname": author_nickname,
                "contributors_nicknames": contributors_nicknames,
                "date_added": date,
                "deadline": deadline
            })
        })
        props.refreshNotes()
    }

    function handleClickAdd() {
        fetch('http://localhost:8080/notes/add', {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'username': props.token.username,
                'password': props.token.password
            },
            body: JSON.stringify({
                "title": title,
                "priority": priority,
                "description": description,
                "rooms": rooms,
                "author_nickname": author_nickname,
                "contributors_nicknames": contributors_nicknames,
                "date_added": date,
                "deadline": deadline
            })
        })
        props.refreshNotes()
    }

    function handleClickDelete() {
        fetch('http://localhost:8080/notes/delete', {
            method: 'delete',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'username': props.token.username,
                'password': props.token.password
            },
            body: JSON.stringify({
                "rowid": props.view.rowid
            })
        })
        props.refreshNotes()
    }

    return (
        <div className="NoteView">
            <div id="title">Edytuj zadanie</div>
            <div id="frima">
                <form>
                    <div>
                        <br></br>Tytuł i Priorytet<br></br>
                    <input id="tytul" value={title} onChange={e => setTitle(e.target.value)}/>

                    
                    <select id="prio" value={priority} onChange={(e) => setPriority(e.target.value) }>
                        <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
                    </select><br></br><br></br>
                    </div>

                    <div>
                        Wybierz sale i osobe<br></br>
                    <select id="select1" value={rooms} onChange={(e) => setRooms(e.target.value)} >
                        <option>2</option><option>3</option><option>4</option><option>105</option><option>109</option><option>117</option><option>121</option><option>Serwerownia</option>
                    </select>


                    
                    {users.length > 0 && (
                        <select id="select1" onChange={(e) => {
                            setAuthor_nickname(e.target.value)
                            setContributors_nicknames(e.target.value)
                        }}>
                            <option value=""></option>
                        {
                            users.map(user => (
                                <option key={user.rowid} value={user.nickname}>
                                    {user.name} {user.surname}
                                </option>
                            ))}
                        </select>
                    )}<br></br><br></br>
                    </div>
                    <div>
                        Data dodania i  Deadline:
                    <input type="date" id="data" value={date} onChange={(e) => setDateAdded(e.target.value)} />

                    
                        <input type="date" id="data" value={deadline} onChange={(e) => setDeadline(e.target.value)} /><br></br><br></br>
                    </div>

                    
                    <div id="sale">sss</div> <div id="osoby">sss</div>
                        
                   <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

                    <div>
                    <br></br>Opis:<br></br>
                    <textarea id="opis" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                </form>
                <Buttons viewMode={props.viewMode} handleClickAdd={handleClickAdd} handleClickModify={handleClickModify} handleClickDelete={handleClickDelete} />
            </div>
        </div>
    )
    
}