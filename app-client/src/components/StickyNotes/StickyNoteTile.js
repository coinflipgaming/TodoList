import React, { useState, useEffect } from 'react'

class StickyNoteTile extends React.Component {
    render() {
        return (
            <div className="StickyNoteTile">
                <div class="content">{this.props.content}</div>
                <button class="deleteButton">✖</button>
            </div>
        )
    }
}

export default StickyNoteTile