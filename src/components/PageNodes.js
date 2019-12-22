import React from 'react'
import { Container, Form, FormControl, Table } from 'react-bootstrap'
import history from '../history'

class PageNodes extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            contacts: null
        }
    }

    componentDidMount() {
        fetch(`https://api.internxt.com/contacts`, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(async res => {
                return { res: res, data: await res.json() }
            })
            .then(({ res, data }) => {
                this.setState({
                    contacts: data
                })
            })
            .catch(err => {
                console.log('Error', err)
            })
    }

    render() {
        return <React.Fragment>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Node ID</th>
                        <th>Address</th>
                        <th>Reputation</th>
                        <th>Time Out Rate</th>
                    </tr>
                    <tr>
                        <th><FormControl></FormControl></th>
                        <th><FormControl></FormControl></th>
                        <th><FormControl></FormControl></th>
                        <th><FormControl></FormControl></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.contacts ?
                        this.state.contacts.map(contact => {
                            const timeoutRate = contact.timeoutRate ? contact.timeoutRate : 0
                            return <tr key={contact.nodeID}>
                                <td><a href="" onClick={() => history.push('/contact/' + contact.nodeID)}>{contact.nodeID}</a></td>
                                <td><a target="_blank" href={'http://' + contact.address + ':' + contact.port}>{contact.address}</a></td>
                                <td>{contact.reputation ? contact.reputation : 0}</td>
                                <td style={{ color: timeoutRate >= 0.04 ? 'red' : 'green' }}>{timeoutRate.toFixed(3)}</td>
                            </tr>;
                        })
                        : null}
                </tbody>
            </Table>
        </React.Fragment>
    }
}

export default PageNodes