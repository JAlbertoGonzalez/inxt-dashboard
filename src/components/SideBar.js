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

import PageContacts from './PageContacts'

const navWidthCollapsed = 64;
const navWidthExpanded = 280;

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
                                this.setState({ expanded: false });
                            }}
                        >

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
                                        <NavIcon><i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /></NavIcon>
                                        <NavText>Home</NavText>
                                    </NavItem>
                                    <NavItem eventKey="contacts">
                                        <NavIcon><i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} /></NavIcon>
                                        <NavText>Contacts</NavText>
                                    </NavItem>
                                    <NavItem eventKey="nodes">
                                        <NavIcon><i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} /></NavIcon>
                                        <NavText>Nodes</NavText>
                                    </NavItem>
                                </SideNav.Nav>
                            </SideNav>
                        </ClickOutside>
                        <Main expanded={this.state.expanded}>
                            <Route path="/" exact component={props => <PageContacts />} />
                            <Route path="/contacts" component={props => <PageContacts />} />
                        </Main>

                    </React.Fragment>
                )}
                />
            </Router>
        );
    }
}

export default SideBar