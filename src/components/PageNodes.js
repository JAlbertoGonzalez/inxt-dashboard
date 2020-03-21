import React from 'react'
import { Container, Form, FormControl, Table, Spinner } from 'react-bootstrap'
import history from '../history'
import ActivityIndicator from './ActivityIndicator'

class PageNodes extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            contacts: null,
            isLoading: true
        }
    }

    componentDidMount() {
        fetch(`/api/contacts`, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(async res => {
            return { res: res, data: await res.json() }
        }).then(({ res, data }) => {
            this.setState({ contacts: data, isLoading: false })
        }).catch(err => {
            console.log('Error', err)
        })
    }

    render() {
        return this.state.isLoading ? <ActivityIndicator /> : (<React.Fragment>
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
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th><label><Form.Control type="checkbox" /> Online</label></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.contacts ?
                        this.state.contacts.map(contact => {
                            const timeoutRate = contact.timeoutRate ? contact.timeoutRate : 0
                            return <tr key={contact._id}>
                                <td><a href="" onClick={() => history.push('/contact/' + contact._id)}>{contact._id}</a></td>
                                <td><a target="_blank" href={'http://' + contact.address + ':' + contact.port}>{contact.address}</a></td>
                                <td>{contact.reputation ? contact.reputation : 0}</td>
                                <td style={{ color: timeoutRate >= 0.04 ? 'red' : 'green' }}>{timeoutRate.toFixed(3)}</td>
                            </tr>;
                        })
                        : null}
                </tbody>
            </Table>
        </React.Fragment>)
    }
}

export default PageNodes