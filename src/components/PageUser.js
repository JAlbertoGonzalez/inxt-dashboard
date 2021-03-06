import React from 'react'
import { Button } from 'react-bootstrap'
import PrettySize from 'prettysize'

class PageUser extends React.Component {
    constructor(props) {
        const email = props.match.params.email
        super(props)

        this.state = {
            email,
            data: null,
            isLoading: true,
            usage: null
        }
    }

    componentDidMount() {
        // User info
        fetch('/api/user/' + this.state.email).then(async res => {
            return { res, data: await res.json() }
        }).then(({ res, data }) => {
            this.setState({ isLoading: false, data })
        }).catch(err => {
            this.setState({ isLoading: false })
        })

        // User space usage
        fetch('/api/user/' + this.state.email + '/usage').then(async res => {
            return { res, data: await res.json() }
        }).then(({ res, data }) => {
            this.setState({ usage: data.total })
        }).catch(err => {
            this.setState({ usage: 'Error' })
        })
    }


    render() {
        var maxSpaceBytes = (this.state.data && this.state.data.maxSpaceBytes) || 0
        maxSpaceBytes = maxSpaceBytes > 0 ? maxSpaceBytes : 1024 * 1024 * 1024 * 2
        return <div>
            <h3>Page user for {this.state.email}</h3>
            <div>Usage: {PrettySize(this.state.usage)} / {this.state.data && PrettySize(maxSpaceBytes)}</div>
            <Button variant="info" block onClick={() => {
            }}>Clean hidden files</Button>
            <Button variant="info" block onClick={() => {
                alert('Not working yet');
            }}>Clean files</Button>
            <Button variant="danger" block onClick={() => {
                alert('Not working yet');
            }}>Delete server account</Button>
            <Button variant="danger" block onClick={() => {
                alert('Not working yet');
            }}>Delete bridge account</Button>
        </div>
    }
}

export default PageUser