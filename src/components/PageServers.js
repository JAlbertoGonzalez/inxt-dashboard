import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Spinner } from 'react-bootstrap';
import ButtonChecker from './ButtonChecker'

const serversData = [
    {
        id: 1,
        name: 'X Cloud Web',
        checker: () => new Promise((resolve, reject) => {
            fetch('https://cloud.internxt.com').then(res => {
                if (res.status === 200) {
                    resolve()
                } else {
                    reject(res.status)
                }

            }).catch(err => reject(err))
        })
    },
    {
        id: 2,
        name: 'X Cloud Server',
        checker: () => new Promise((resolve, reject) => {
            fetch('https://cloud.internxt.com/api/bits').then(res => {
                if (res.status === 200) { resolve() }
                else { reject(res.status) }

            }).catch(err => reject(err))
        })
    },
    {
        id: 3,
        name: 'Bridge',
        checker: () => new Promise((resolve, reject) => {
            fetch('https://api.internxt.com/').then(res => {
                if (res.status === 200) { resolve() }
                else { reject(res.status) }

            }).catch(err => reject(err))
        })

    },
    {
        id: 4,
        name: 'Renter 01',
        checker: () => new Promise((resolve, reject) => {
            fetch('http://renter01.internxt.com:4000/').then(res => {
                if (res.status === 405) {
                    resolve()
                } else {
                    console.log(res)
                    reject(res.status)
                }

            }).catch(err => reject(err))
        })

    },
    {
        id: 5,
        name: 'Renter 02',
        checker: () => new Promise((resolve, reject) => {
            fetch('http://renter02.internxt.com:4000/').then(res => {
                if (res.status === 405) {
                    resolve()
                } else {
                    console.log(res)
                    reject(res.status)
                }

            }).catch(err => reject(err))
        })
    },
    {
        id: 6,
        name: 'Link Shorter',
        checker: () => new Promise((resolve, reject) => {
            fetch('https://inxt.link/').then(res => {
                if (res.status === 200) { resolve() }
                else {
                    console.log(res)
                    reject(res.status)
                }

            }).catch(err => reject(err))
        })
    },
    {
        id: 7,
        name: 'Mongo Bridge',
        checker: () => new Promise((resolve, reject) => {
            fetch('http://api.internxt.com:27017/').then(res => {
                console.log('aaa')
                reject()
            }).catch(err => {
                console.log(err.stack)
                reject(err)
            })
        })
    },
    {
        id: 8,
        name: 'Mongo Renter'
    },
    {
        id: 9,
        name: 'Mongo Replica'
    }
]

const columns = [
    {
        dataField: 'name',
        text: 'Name'
    },
    {
        dataField: 'checker',
        text: 'Check',
        formatter: (cell, row, rowIndex, formatExtraData) => {
            return <ButtonChecker checkFunction={cell} />
        }
    },

]

class PageServers extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: serversData
        }
    }

    render() {
        return <div>
            <h1>Servers Status</h1>
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

        </div>
    }
}

export default PageServers