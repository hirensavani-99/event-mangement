import React from "react";
import classes from './Footer.module.css'
//import 'materialize-css/dist/css/materialize.min.css'
import logo from '../../../assets/logo.png'
const FooterPage = () => {
    return (
        <div>
            <footer className={classes.pagefooter}>
                <div className="container">
                    <div className="row">
                        <div className="col l6 s12">
                            <img className={classes.logo} src={logo} />
                            <h5 className={classes.text}>Reach us</h5>
                            <p className={classes.text}>65, varachha 45-223, surat, india</p>
                            <p className={classes.text}>hiren99savani@gmail.com</p>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className={classes.text}>useFull links</h5>
                            <ul>
                                <li><a className={classes.text} href="">Sign In</a></li>
                                <li><a className={classes.text} href="#!">Sign Up</a></li>
                                <li><a className={classes.text} href="#!">Be Partner</a></li>

                            </ul>
                        </div>
                        <div className="col l4 offset-l2 s12">
                            <h5 className={classes.text}>our services</h5>
                            <ul>
                                <li><a className={classes.text} href="#!">Festival events</a></li>
                                <li><a className={classes.text} href="#!">seminars</a></li>
                                <li><a className={classes.text} href="#!">Educational events</a></li>
                                <li><a className={classes.text} href="#!">dance party</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default FooterPage;