import React from "react";
import AuthNav from "./auth/AuthNav";
import { Link } from "react-router-dom";
import icon from "./../images/logo.png";

import styles from  "./../css/Navbar.module.css";

const Navbar = () => {
  return (
    <div>
      <nav className={styles.nav}>
        <Link to="/">
          <img className={styles.navIcon} src={icon}></img>
        </Link>
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <Link to="/notes" className={styles.navLink}>Notes</Link>
          </li>
        </ul>
        <AuthNav />
      </nav>
    </div>
  );
};

export default Navbar;
