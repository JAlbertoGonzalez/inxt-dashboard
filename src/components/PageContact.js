import React from 'react'
import { Container } from 'react-bootstrap'

class PageContact extends React.Component {
    constructor(props) {
        const nodeid = props.match.params.nodeid
        super(props)

        this.state = {
            nodeid,
            data: null,
            isLoading: true
        }
    }

    componentDidMount() {
        console.log('fetching data')
        fetch('/api/contact/' + this.state.nodeid).then(async res => {
            return { res, data: await res.json() }
        }).then(({ res, data }) => {
            console.log(data)
            this.setState({
                isLoading: false,
                data
            })
        }).catch(err => {
            this.setState({
                isLoading: false
            })
        })
    }

    render() {
        return <Container className="mt-3">
            <h3>Contact {this.state.nodeid}</h3>
            {JSON.stringify(this.state.data)}
        </Container>
    }
}

export default PageContact