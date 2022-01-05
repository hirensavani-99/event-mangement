import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as Scroll } from 'react-scroll'


import classes from './Header.module.css'
import logo from '../../../assets/logo.png'

export default function Header(props) {
    const [checked, setChecked] = useState(false)
    const [toggaleMenu, setToggleMenu] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    useEffect(() => {
        setChecked(true)
    }, [])

    useEffect(() => {

        const changeWidth = () => {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }

    }, [])

    const toggalNav = () => {
        setToggleMenu(!toggaleMenu)
    }

    return (
        <div className={props.LandingPage ? classes.root : classes.root1} id="Header">
            <AppBar className={classes.appBar} color="transparent" elevation={0}>
                <Toolbar className={classes.appBarWrapper} color="inherit">
                    <div className={classes.appBarTitle}><img className={classes.img} src={logo} /></div>

                    {(toggaleMenu || screenWidth > 600) && <div className={classes.list}>


                        <NavLink exact activeClassName={classes.active} className={classes.iconDetail} to='/'>Home</NavLink>
                        <NavLink exact activeClassName={classes.active} className={classes.iconDetail} to='/Signin'>signin</NavLink>
                        <NavLink exact activeClassName={classes.active} className={classes.iconDetail} to='/Signup'>signup</NavLink>
                        <NavLink exact activeClassName={classes.active} className={classes.iconDetail} to='/Partner'>Be-Partner</NavLink>
                       
                    </div>}
                    <MenuIcon className={classes.dropdwnbtn} onClick={toggalNav} />
                </Toolbar>

            </AppBar>
            {props.LandingPage && <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})} collapsedHeight={50}>
                <div className={classes.container}>
                    <h1 className={classes.title}>Welcome to <br />Even<span className={classes.nameMiddle}>T</span>Eve</h1>
                    <Scroll to="NextEvent" smooth={true}>

                        <IconButton>

                            <ExpandMoreIcon className={classes.godown} />
                        </IconButton>
                    </Scroll>


                </div>
            </Collapse>}
        </div >
    )
}
