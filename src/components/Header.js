/**
 * Created by atmaramn on 7/13/17.
 */
import React,{ Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import {logout, profile, roles, unregister} from '../actions/auth'
import './Menu.css'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Redirect} from "react-router-dom";
export class Header extends Component{
    componentDidMount(){
        if (this.props.user.isLoggedIn) {
            if(!this.props.user.roles)
                this.props.load_roles();

            if(!this.props.user.profile)
                this.props.load_profile();
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(this.props.user.isLoggedIn && !prevProps.user.isLoggedIn){
            if(!this.props.user.roles)
                this.props.load_roles();

            if(!this.props.user.profile)
                this.props.load_profile();
        }
    }
    render(){
        var menu_links=[];
        var right_nav="";

        if(this.props.user.profile){
            right_nav=<Nav pullRight>
                <NavDropdown eventKey="4" title={this.props.user.profile.name} id="nav-dropdown">
                    <MenuItem><span onClick={this.props.logout} className="menu" id="logout">Logout</span></MenuItem>
                    <MenuItem><span onClick={this.props.unregister} className="menu" id="unregister">Un Register</span></MenuItem>
                </NavDropdown>
            </Nav>;
        } else {
            menu_links.push(<NavItem><LinkContainer to="/register" className="menu"><span id="register">Register</span></LinkContainer></NavItem>);
            menu_links.push(<NavItem><LinkContainer to="/login" className="menu"><span id="login">Login</span></LinkContainer></NavItem>);
        }
        return (<Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <LinkContainer to="/" className="menu"><span id="home">Webstore</span></LinkContainer>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            <Nav>
                {menu_links}
            </Nav>
                {right_nav}
        </Navbar.Collapse>
        </Navbar>);
    }
}
Header.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    user: PropTypes.any,
    logout:PropTypes.func,
    unregister:PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn:state.user.isLoggedIn,
        user:state.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        unregister: () => dispatch(unregister()),
        load_roles:()=> dispatch(roles()),
        load_profile:()=> dispatch(profile()),
    };
};
Header = connect(mapStateToProps,mapDispatchToProps)(Header)
export default Header;