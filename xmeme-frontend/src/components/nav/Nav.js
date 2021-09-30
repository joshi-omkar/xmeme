import React from 'react'
import {Link} from "react-router-dom";
import './nav.css'

const Nav=()=> {
    return (
        <div className="nav">
            <div className="logo">
                <h2>xmeme</h2>
            </div>

            <div className="link">
                <div className="home">
                    <Link to='/'>
                        Home
                    </Link>
                </div>
                <div className="form">
                    <Link to='/addmeme'>
                        Add Meme
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Nav
