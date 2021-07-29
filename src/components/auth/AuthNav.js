import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import AuthenticationButton from "./AuthenticationButton";

import styles from  "./../../css/Navbar.module.css";

const AuthNav = () => {
  const { user } = useAuth0();

  return (
    <div>
      <ul className={styles.navLink}>
        <li>
          <AuthenticationButton />
        </li>
      </ul>
    </div>
  );
};

export default AuthNav;
