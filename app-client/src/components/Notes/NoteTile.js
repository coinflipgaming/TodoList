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
    }
    return (
        <div className="NoteTile" onClick={handleClick}>
            <div className="title">{props.tytul}</div>
            <div className="description">{props.description}</div>
        </div>
    )
}