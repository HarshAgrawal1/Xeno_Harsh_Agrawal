import React from 'react';
import { Link } from 'react-router-dom';
import '../style/NavBar.css';

const Navbar = () => (
  <nav>
    <Link to="/Home" activeClassName="active">Home</Link>
    <Link to="/audience" activeClassName="active">Audience</Link>
    <Link to="/campaigns" activeClassName="active">Campaigns</Link>
    <Link to="/login" activeClassName="active">Login</Link>
    <Link to="/send-message" activeClassName="active" >Send Message </Link>
    <Link to="/campaign-stats" activeClassName="active"  > Statistics </Link>
  </nav>
);

export default Navbar;
