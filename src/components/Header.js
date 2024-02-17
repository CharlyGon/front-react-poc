import React from "react";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <ul>
                    <li>
                        <a href="/">Data Entry</a>
                    </li>
                    <li>
                        <a href="/transaction/">Transaction Info</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
