import React from 'react'
import SideBar from './SideBar';

class MainWindow extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        return <div>
            <SideBar />
        </div>
    }
}

export default MainWindow