import React from 'react'

class PageUser extends React.Component {
    constructor(props) {
        const email = props.match.params.email
        super(props)

        this.state = {
            email
        }
    }

    componentDidMount() {
        
    }

    render() {
        return <div>Page user for {this.state.email}</div>
    }
}

export default PageUser