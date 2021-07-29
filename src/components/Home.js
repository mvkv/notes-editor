import React from "react";
import { Link } from "react-router-dom";
import logo from "./../images/logo.png";

import globalStyles from "../css/App.module.css"
import styles from  "../css/Home.module.css"

export default function Home() {
  return (
    <div className={`${globalStyles.pageContent} ${styles.home}`}>
      <div className={styles.homeText}>
        <h2>The note-editor _</h2>
        <p>Omg lorem ipsum...</p>
        <Link className={globalStyles.button} to="/notes">Join now</Link>
      </div>
      <div>
        <img className={styles.homeImage} src={logo} />
      </div>
    </div>
  );
}
