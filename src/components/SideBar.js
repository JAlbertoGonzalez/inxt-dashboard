import React, { Devices, RootComponent, Home } from 'react'
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ClickOutside from 'react-click-outside'
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faHdd, faHome, faServer, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'


import PageUsers from './PageUsers'
import PageNodes from './PageNodes'
import PageContact from './PageContact'
import PageUser from './PageUser'
import PageServers from './PageServers'
import PagePayments from './PagePayments'

const navWidthCollapsed = 64;
const navWidthExpanded = 250;

const Main = styled.main`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: ${props => (props.expanded ? navWidthExpanded : navWidthCollapsed)}px;
    overflow: hidden;
    transition: all .15s;
    padding: 0 20px;
    transition: background-color .35s cubic-bezier(.4, 0, .2, 1);
`;


class SideBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        }

    }

    render() {
        return (
            <Router>
                <Route render={({ location, history }) => (
                    <React.Fragment>
                        <ClickOutside
                            onClickOutside={() => {
                                if (this.state.expanded) { this.setState({ expanded: false }); }
                            }}>

                            <SideNav
                                onSelect={(selected) => {
                                    const to = '/' + selected;
                                    if (location.pathname !== to) { history.push(to); }
                                }}
                                expanded={this.state.expanded}
                                onToggle={(expanded) => {
                                    this.setState({ expanded });
                                }}>

                                <SideNav.Toggle />
                                <SideNav.Nav defaultSelected="home">
                                    <NavItem eventKey="home">
                                        <NavIcon><FontAwesomeIcon icon={faHome} /></NavIcon>
                                        <NavText>Home</NavText>
                                    </NavItem>
                                    <NavItem eventKey="users">
                                        <NavIcon><FontAwesomeIcon icon={faUsers} /></NavIcon>
                                        <NavText>Users</NavText>
                                    </NavItem>
                                    <NavItem eventKey="nodes">
                                        <NavIcon><FontAwesomeIcon icon={faHdd} /></NavIcon>
                                        <NavText>Nodes</NavText>
                                    </NavItem>
                                    <NavItem eventKey="servers">
                                        <NavIcon><FontAwesomeIcon icon={faServer} /></NavIcon>
                                        <NavText>Servers</NavText>
                                    </NavItem>
                                    <NavItem eventKey="payments">
                                        <NavIcon><FontAwesomeIcon icon={faMoneyCheckAlt} /></NavIcon>
                                        <NavText>Payments</NavText>
                                    </NavItem>
                                </SideNav.Nav>
                            </SideNav>
                        </ClickOutside>

                        <Main expanded={this.state.expanded} style={{ overflow: 'scroll' }}>
                            <Route path="/" exact component={props => <div>Home</div>} />
                            <Route path="/users" component={props => <PageUsers />} />
                            <Route path="/nodes" component={props => <PageNodes />} />
                            <Route path="/servers" component={props => <PageServers />} />
                            <Route path="/contact/:nodeid" component={props => <PageContact {...props} />} />
                            <Route path="/user/:email" component={props => <PageUser {...props} />} />
                            <Route path="/payments" component={props => <PagePayments {...props} />} />
                        </Main>

                    </React.Fragment>
                )}
                />
            </Router>
        );
    }
}

export default SideBar