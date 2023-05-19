import { useEffect, useState } from 'react'
import './NoteView.css'

export default function NoteView(props) {
    const [title, setTitle] = useState()
    const [priority, setPriority] = useState()
    const [rooms, setRooms] = useState()
    const [author_nickname, setAuthor_nickname] = useState()
    const [deadline, setDeadline] = useState()
    const [description, setDescription] = useState()

    useEffect(() => {
        setTitle(props.view.title)
        setPriority(props.view.priority)
        setRooms(props.view.rooms)
        setAuthor_nickname(props.view.author_nickname)
        setDeadline(props.view.deadline)
        setDescription(props.view.description)
    }, [props.view])

    function handleClickModify() {
        fetchModify()
    }
    function fetchModify() {
        fetch('http://localhost:8080/notes/modify', {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'username': 'asinatio',
                'password': 'haslo'
            },
            body: JSON.stringify({
                "rowid": props.view.rowid,
                "title": title,
                "priority": priority,
                "description": description,
                "rooms": rooms,
                "author_nickname": author_nickname,
                "contributors_nicknames": props.view.contributors_nicknames,
                "date_added": "2023-05-19",
                "deadline": deadline
            })
        })
            //.then((response) => console.log(response))
    }

    return (
        <div className="NoteView">
            <div id="title">Edytuj zadanie</div>
            <div id="frima">
                <form>
                    Tytuł:
                    <input id="tytul" value={title} onChange={e => setTitle(e.target.value)}/>

                    Priorytet:
                    <select id="select1" value={priority} onChange={(e) => setPriority(e.target.value) }>
                        <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
                    </select>

                    Sale:
                    <input value={rooms} onChange={(e) => setRooms(e.target.value)} />

                    Wybierz osobe<br></br>
                    <select id="select1" value={author_nickname} onChange={(e) => setAuthor_nickname(e.target.value)}>
                        <option>Jakub Perron</option>
                        <option>Damian Mika</option>
                    </select>

                    Data dodania:
                    <input type="date" id="data" value={props.view.date_added}/>

                    Deadline:
                    <input type="date" id="data" value={deadline} onChange={(e) => setDeadline(e.target.value)}/>

                    Opis:
                    <textarea id="opis" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
               </form>
                <button type="submit" value="submit" id="submit" onClick={handleClickModify}>Done</button>
               <button type="reset" value="reset" id="reset">Usun</button>
            </div>
        </div>
    )
    
}