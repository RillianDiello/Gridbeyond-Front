import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
      <aside className="menu-area">
        <nav className="menu">
          <Link to="/">
            <i className="fa fa-home"></i> Home
          </Link>
          <Link to="/files">
            <i className="fa fa-file"></i> Files
          </Link>
        </nav>
      </aside>
    );
  };
  export default Nav;