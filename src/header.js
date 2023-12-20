import React from 'react';
import { NavLink } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router
import './styles/header.css'; // Import the header.css file

const Header = () => {
    return (
        <Router> {/* Wrap the Header component with Router */}
            <header className="header"> {/* Add className prop */}
                <h1>Task Done</h1>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
       
                    </ul>
                </nav>
            </header>
        </Router>
    );
};

export default Header;
