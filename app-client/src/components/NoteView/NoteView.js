import { useEffect, useState } from 'react'
import './NoteView.css'
import Buttons from './Buttons.js'

export default function NoteView(props) {
    const [title, setTitle] = useState()
    const [priority, setPriority] = useState()
    const [rooms, setRooms] = useState([])
    const [author_nickname, setAuthor_nickname] = useState(`${props.token.name} ${props.token.surname}`)
    const [contributors_nicknames, setContributors_nicknames] = useState([`${props.token.name} ${props.token.surname}`])
    const [date, setDateAdded] = useState()
    const [deadline, setDeadline] = useState()
    const [description, setDescription] = useState()


    const [selectedOption1, setSelectedOption1] = useState(" ")
    const [selectedOption2, setSelectedOption2] = useState(" ")

    useEffect(() => {
        setTitle(props.view.title)
        setPriority(props.view.priority)
        setRooms(props.view.rooms)
        setAuthor_nickname(props.view.author_nickname)
        setContributors_nicknames(props.view.contributors_nicknames)
        setDateAdded(props.view.date_added)
        setDeadline(props.view.deadline)
        setDescription(props.view.description)
        props.refreshUsers()
    }, [props.view])


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
                        Wybierz sale i osoby<br></br>
                        <select value={selectedOption2} id="select1" onChange={(e) => {
                            if (!rooms.includes(e.target.value) && e.target.value != "") {
                                rooms.push(e.target.value)
                            }
                            setSelectedOption2(e.target.value)
                        }}><option value=""></option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="105">105</option>
                            <option value="109">109</option>
                            <option value="117">117</option>
                            <option value="121">121</option>
                            <option value="Serwerownia">Serwerownia</option>
                    </select>


                    
                    {props.users.length > 0 && (
                            <select value={selectedOption1} id="select1" onChange={(e) => {
                                if (!contributors_nicknames.includes(e.target.value) && e.target.value != "") {
                                    contributors_nicknames.push(e.target.value)
                                }
                                setSelectedOption1(e.target.value)
                            }}><option value=""></option>
                            {props.users.map(user => (
                                <option key={user.name + " " + user.surname} value={`${user.name} ${user.surname}`}>
                                    {user.name} {user.surname} 
                                </option>
                            ))}
                        </select>
                        
                    )}<br></br>
                    </div>
                    <div id="sale">
                        {Array.isArray(rooms)
                            ? rooms.map(user => (
                                <li key={rooms.indexOf(user)}>
                                    {user}
                                    <div onClick={() => {
                                        setRooms(rooms.filter(item => item !== user))
                                    }}>X</div>
                                </li>
                            ))
                            : setRooms(rooms.split(","))

                        }
                    </div>

                    <ul id="osoby">
                        {Array.isArray(contributors_nicknames)
                            ? contributors_nicknames.map(user => (
                                <li key={contributors_nicknames.indexOf(user)}>
                                    {user}
                                    <div onClick={() => {
                                        setContributors_nicknames(contributors_nicknames.filter(item => item !== user))
                                    }}>X</div>
                                </li>
                              ))
                            : setContributors_nicknames(contributors_nicknames.split(","))
                            
                        }
                    </ul>
                    <div>

                        Data dodania i  Deadline:
                        <input type="date" id="data" value={date} onChange={(e) => setDateAdded(e.target.value)} />
                        <input type="date" id="data" value={deadline} onChange={(e) => setDeadline(e.target.value)} /><br></br><br></br>
                    </div>

                    


                    <div>
                    Opis:<br></br>
                    <textarea id="opis" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                </form>
                <Buttons viewMode={props.viewMode} handleClickAdd={handleClickAdd} handleClickModify={handleClickModify} handleClickDelete={handleClickDelete} />
            </div>
        </div>
    )

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
}