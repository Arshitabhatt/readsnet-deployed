import React, { Component } from 'react';
import { Link, NavLink} from 'react-router-dom';
import { Redirect } from 'react-router';
import '../styles/navbar.css'


export default class Navbar extends Component {

  render() {
    return (
    <div>
      <nav id="mainNavbar" className=" navbar navbar-light navbar-expand-lg fixed-top pb-0 mb-0">
      <Link exact to="/" className="navbar-brand"><img src={require('../uploads/Readsnet3.png')} alt="Logo"/></Link>
        <button className="navbar-toggler" data-toggle="collapse" data-target="#navLinks" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navLinks">
            <ul className="navbar-nav">
                <li className="nav-item">
                <NavLink exact to="/" activeClassName="active" className=" nav-link p-3 pt-2 mr-3">Upcoming</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/twiceread" activeClassName="active" className=" nav-link p-3 pt-2  mr-3">Twice Read</NavLink>
                </li>
                <li className="nav-item">
                <NavLink to="/addevent"  activeClassName="active" className=" nav-link p-3 pt-2  mr-3">Add My Event</NavLink>
                </li>
            </ul> 
        </div>
      </nav>
    </div>
     
    );
  }
}