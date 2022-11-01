import React from 'react'
import { Link, useLocation } from "react-router-dom";



const Navbar = (props) => {

    const signOut = () => {
        localStorage.removeItem('token');
        console.log('signOut')
    }
    let location = useLocation();
    return (
        <>


            <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">E-Notes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to={`${localStorage.getItem('token') ? "/about" : "/login"}`}>About</Link>
                            </li>

                        </ul>

                        <form className={`${localStorage.getItem('token') ? 'd-none' : 'd-flex'}`} >

                            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary" to="/signup" role="button">Signup</Link>
                        </form>
                        <form className={`${localStorage.getItem('token') ? 'd-flex' : 'd-none'}`} >

                            <Link className="btn btn-primary mx-2" onClick={signOut} to="/login" role="button">SignOut</Link>
                        </form>


                    </div>
                </div>
            </nav >
            <div className={`form-check form-switch d-flex justify-content-end m-2 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                <input className="form-check-input mx-2 my-2 " onClick={props.toggleMode} type="checkbox" id="flexSwitchCheckDefault" />
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable {props.mode == 'dark' ? 'LightMode' : 'DarkMode'}</label>
            </div>
        </>
    )
}

export default Navbar