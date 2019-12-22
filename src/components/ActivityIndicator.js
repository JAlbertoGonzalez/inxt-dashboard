import React from 'react'
import { Spinner } from 'react-bootstrap'
import './ActivityIndicator.css'

class ActivityIndicator extends React.Component {
    render() {
        return <div className="ActivityIndicator-container">
            <Spinner animation="border" role="status" variant="danger">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    }
}

export default ActivityIndicator