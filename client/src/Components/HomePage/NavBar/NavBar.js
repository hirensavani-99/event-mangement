import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { useHistory } from 'react-router';

import AuthContex from '../../../store/auth-context'

import { Navbar, Container, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap'
import classes from './NavBar.module.css'
import logo from '../../../assets/logo.png'

export default function NavBar() {

    const authctx = useContext(AuthContex);
    let history = useHistory();

    const logoutHandler = () => {
        authctx.logout();
        history.replace('/Signin')
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Link to="/home" className={classes.link}><div className={classes.appBarTitle}><img className={classes.appBarimg} src={logo} /></div></Link>

                    <nav className={classes.logout} onClick={logoutHandler}>LogOut</nav>

                </Container>

            </Navbar>
        </div>
    )
}
