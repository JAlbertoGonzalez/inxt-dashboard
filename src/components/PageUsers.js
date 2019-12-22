import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import ActivityIndicator from './ActivityIndicator'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import history from '../history'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faHdd, faHome, faCheckSquare, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import PrettySize from 'prettysize'

const columns = [
    {
        dataField: 'id',
        text: 'User',
        filter: textFilter(),
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => {
            return <a href="" onClick={() => history.push('/user/' + cell)}>{cell}</a>
        }
    },
    {
        dataField: 'activated',
        text: 'Activated',
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => {
            return <FontAwesomeIcon icon={cell ? faCheckSquare : faExclamationTriangle} style={{ color: cell ? 'green' : 'red' }} />
        }
    },
    {
        dataField: 'maxSpaceBytes',
        text: 'Plan',
        sort: true,
        formatter: (cell, row, rowIndex, formatExtraData) => {
            if (cell == 0) {
                cell = 1024 * 1024 * 1024 * 2
            }
            switch (cell) {
                case 1024 * 1024 * 1024 * 2:
                case 0:
                    return "Free"
                case 1024 * 1024 * 1024 * 100:
                    return "100 GB"
                case 1024 * 1024 * 1024 * 1024:
                    return "1 TB"
                default:
                    return "Error: " + PrettySize(cell)
            }
        }
    }
];

class PageUsers extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            data: null,
            error: null
        }
    }

    componentDidMount() {
        fetch('/api/users').then(async res => {
            return { res, data: await res.json() }
        }).then(({ res, data }) => {
            console.log(data)
            this.setState({
                isLoading: false,
                data: data
            })
        }).catch(err => {
            this.setState({
                isLoading: false,
                error: err
            })
        })
    }

    render() {
        return <Container>
            {
                this.state.isLoading ?
                    <ActivityIndicator /> :
                    <BootstrapTable
                        bootstrap4
                        keyField='id'
                        data={this.state.data}
                        filter={filterFactory()}
                        columns={columns}
                        striped
                        hover
                        condensed
                    >
                    </BootstrapTable>
            }
        </Container>
    }
}

export default PageUsers