import React from 'react';
import './Header.css';
import { useUserContext } from "../context/userContext";

function Navbar() {
    const { logoutUser } = useUserContext();
  return (
      <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
        <button onClick={logoutUser}>Log out</button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
