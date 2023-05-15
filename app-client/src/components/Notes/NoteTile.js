import React, { useState, useEffect } from 'react'

class NoteTile extends React.Component {
    render() {
        return (
            <div className="NoteTile">
                <div class="title">{this.props.tytul}</div>
                <div class="description">{this.props.description}</div>
            </div>
        )
    }
}

export default NoteTile