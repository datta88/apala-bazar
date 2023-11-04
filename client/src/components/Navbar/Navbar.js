import React, { useState } from "react";
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const [user, setUser] = useState({});

    useState(() => {
        const userStorage = JSON.parse(localStorage.getItem("user") || '{}')
        setUser(userStorage);
    }, [])

    return (
        <>
            <div className="navbar-container">
                <div>
                    <Link to="/" className="font">Apala Bazar</Link>
                </div>
                <div className="all-containt">
                    <Link to='/login' className='font space'>Login</Link>
                    <Link to='/signup' className='font space'>Signup</Link>
                    <Link to='/myorder' className='font space'>my order</Link>
                </div>



                <div>
                    <p className='font'>Hello   {user.name || "user!"}</p>

                    {
                        user?.name ? <span className="navbar-logout" onClick={() => {
                            localStorage.removeItem("user");
                            window.location.href = "/login";
                        }}>LogOut</span> : null
                    }
                </div>
            </div>
        </>
    )
}
export default Navbar