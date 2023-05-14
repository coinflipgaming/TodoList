import React, {useState, useEffect} from 'react'
import './NoteTile.css'
class NoteTile extends React.Component {
    render() {
        return (
            <div className="NoteTile">
                <button type="button" id="done">✔</button>
                <button type="button" id="delete">✖</button>
                <p>{ this.props.title }</p>
                <p>{ this.props.description }</p>
            </div>
            )
    }
}

export default NoteTile