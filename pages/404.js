import React from "react";
import styles from "../styles/404.module.css"
import Link from "next/link";

const NotFound = () => {
    return (
        <div id={styles.notfound}>
            <div className={styles.notfound}>
                <div className={styles.notfound404}>
                    <h1>Oops!</h1>
                </div>
                <h2>404 - Page not found</h2>
                <p>
                    The page you are looking for might have been removed had its name
                    changed or is temporarily unavailable.
                </p>
                <Link href="/">Go To Homepage</Link>
            </div>
        </div>
    );
}

export default NotFound;
