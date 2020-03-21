import React from 'react'
import { Button, Spinner } from 'react-bootstrap'

class ButtonChecker extends React.Component {

    constructor(props) {
        super(props)

        console.log(props)

        this.state = {
            checkFunction: props.checkFunction,
            isChecking: false,
            error: false,
            result: 'Check'
        }
    }

    startChecking() {
        this.setState({
            isChecking: true,
            error: false,
            result: ''
        }, () => {
            setTimeout(() => {
                this.check()
            }, 1000)
        })
    }

    check() {
        if (typeof this.state.checkFunction !== 'function') {
            this.setState({
                isChecking: false,
                error: true,
                result: 'Error'
            })
            return console.error('checkFunction is not a function')
        }

        const promise = this.state.checkFunction()

        if (!(promise instanceof Promise)) {
            return console.error('checkFunction is not a promise')
        }

        promise.then(() => {
            this.setState({
                isChecking: false,
                error: false,
                result: 'Ok'
            })
        }).catch(err => {
            this.setState({
                isChecking: false,
                error: true,
                result: 'Error'
            })
            console.error('Error checking')
        })
    }

    componentDidMount() {
        this.startChecking()
    }

    render() {
        return <Button onClick={this.startChecking.bind(this)} variant="danger">
            {
                this.state.isChecking ? <Spinner animation="border" /> : this.state.result
            }

        </Button>
    }

}

export default ButtonChecker