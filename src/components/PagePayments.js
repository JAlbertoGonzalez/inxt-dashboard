import React from 'react'
import { Container, InputGroup, Row, Col, FormControl, Button, Form } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

const columns = [
    {
        dataField: 'id',
        text: 'User',
        sort: true,
    }
]

const expandRow = {
    renderer: row => {
        console.log('Expanded')
        return (
            <div>
                <p>{`Details of ${row.id}`}</p>
            </div>
        )
    }
};


class PagePayments extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [{
                id: 'hola'
            }]
        }
    }

    submitForm(e) {
        e.preventDefault()
    }

    render() {
        return <div>
            <h1>Payments</h1>

            <Container>
                <Form onSubmit={this.submitForm.bind(this)}>
                    <Row>
                        <Col xs={12} md={4}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">Exclude older than</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="days"
                                    aria-label="days"
                                    aria-describedby="basic-addon1"
                                    value="2"
                                />
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon1">days</InputGroup.Text>
                                </InputGroup.Prepend>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={4}>
                            <Button variant="primary" type="submit" block>Submit</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Container>
                <BootstrapTable
                    bootstrap4
                    keyField='id'
                    columns={columns}
                    data={this.state.data}
                    filter={filterFactory()}
                    expandRow={expandRow}
                />
            </Container>

        </div>
    }
}

export default PagePayments
