import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
    return (
        <nav className="navc">

            <div className="logo-container">
                <h3 className="logo">LostFoundry</h3>
                <img src={logo} className="logo-img" />
            </div>

            <div className="nav-links">
                <Link to="/home">Home</Link>
                <Link to="/submit">Submit</Link>
                <Link to="/">Login</Link>
                <Link to="/about">About us</Link>
                <Link to="/account">Account</Link>

            </div>
        </nav>
    );
};

export default Navbar;
