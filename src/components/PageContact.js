import React from 'react'

class PageContact extends React.Component {
    constructor(props) {
        const nodeid = props.match.params.nodeid
        super(props)

        this.state = {
            nodeid
        }
    }

    render() {
        return <div>Contact {this.state.nodeid}</div>
    }
}

export default PageContact