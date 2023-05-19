import React, { useState, useEffect } from 'react'

class StickyNoteTile extends React.Component {
    render() {
        return (
            <div className="StickyNoteTile">
                <div className="content">{this.props.content}</div>
                <button className="deleteButton">✖</button>
            </div>
        )
    }
}

export default StickyNoteTile