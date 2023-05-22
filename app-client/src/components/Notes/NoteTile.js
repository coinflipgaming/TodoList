export default function NoteTile(props) {
    function handleClick(e) {
        e.preventDefault()
        props.setView({
            "author_nickname": props.author_nickname,
            "contributors_nicknames": props.contributors_nicknames,
            "date_added": props.date_added,
            "deadline": props.deadline,
            "description": props.description,
            "priority": props.priority,
            "rooms": props.rooms,
            "rowid": props.rowid,
            "title": props.title
        })
        props.setViewMode("Modify")
    }
    return (
        <div className="NoteTile" onClick={handleClick}>
                <div className="title">
                    <label>tytul: </label>{props.title}
                </div>
                <div className="sala">
                    <label>Sala: </label>{props.rooms}
                </div>
                <div className="osoba">
                    <label>autor: </label> {props.author_nickname}
                </div>
                <div className="priority">
                    <label>priorytet: </label>{props.priority}
                </div>
                <div className="data">
                    <label>data: </label>{props.date_added}
                </div>
                <div className="deadline">
                    <label>deadline: </label>{props.deadline}
                </div>
                <div className="description"><label>opis: </label>{props.description}</div>
            </div>
    )
}