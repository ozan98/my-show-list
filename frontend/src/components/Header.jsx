import React from 'react'
import {Link } from 'react-router-dom'

function Header() {
    return (
        <header className="header">
            <div>
                <Link to="/">My Show List</Link>
            </div>

            <div>
                <Link to="/dashboard">My List</Link>
            </div>

            <div>
                <Link to="/login">Login</Link>
            </div>

            <div>
                <Link to="/register">Register</Link>
            </div>
        </header>
    )
}

export default Header