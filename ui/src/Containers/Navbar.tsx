import React, { useState } from 'react';
import './css/Navbar.css';

export function Navbar(props: any) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

export function NavItem(props: any) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="/#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      
      {open && props.children}
    </li>
  );
}