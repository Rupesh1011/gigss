import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./Navbar.scss"
import newRequest from '../../utils/newRequest';

function Navbar() {

    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const {pathname} = useLocation()
    const navigate = useNavigate();

    const isActive = ()=>{
        window.scrollY > 0 ? setActive(true) : setActive(false)
    }

    useEffect(()=>{
        window.addEventListener("scroll", isActive);

        return ()=>{
            window.removeEventListener("scroll", isActive)
        };
    },[]);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const handleLogout = async()=>{
        try {
            await newRequest.post("/auth/logout");
            localStorage.setItem("currentUser",null)
            navigate("/")
        } catch (error) {
            
        }
    }

  return (
    <div className={active || pathname != "/"  ? 'navbar active' : 'navbar'}>
        <div className='container'>
            <div className="logo">
            <Link to="/" className='link'>
                <span className='text'>gigss</span>
            </Link>
                <span className="dot">.</span>
            </div>
            <div className="links">
                <span>Gigss Business</span>
                <span>Explore</span>
                <span>English</span>
                
                {!currentUser?.isSeller && <span>Become a Seller</span>}
            
                {currentUser ? (
                    <div className="user" onClick={()=>{setOpen(!open)}}>
                        <img src={currentUser.img || "/img/noavatar.jpg"}/>
                        <span>{currentUser?.username}</span>
                        {open && <div className="options">
                            {currentUser?.isSeller && (
                                <>
                                    <Link className='link' to="/mygigs">Gigs</Link>
                                    <Link className='link' to="/add">Add New Gig</Link>
                                </>
                            )}
                            <Link className='link' to="/orders">Orders</Link>
                            <Link className='link' to="/messages">Messages</Link>
                            <Link className='link' onClick={handleLogout}>Logout</Link>
                        </div>}
                    </div> 
                ):(
                    <>
                        <Link to="/login" className="link">Sign in</Link>
                        <Link className="link" to="/register">
                        <button>Join</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
        {(active || pathname != "/") 
        && 
        <>
        <hr />
        <div className="menu">
            <Link className='link' to="/">
                Graphics & Design
            </Link>
            <Link className='link' to="/">
                Video & Animation
            </Link>
            <Link className='link' to="/">
                Writing & Translation
            </Link>
            <Link className='link' to="/">
                AI Services
            </Link>
            <Link className='link' to="/">
                Digital Marketing
            </Link>
            <Link className='link' to="/">
                Music & Audio
            </Link>
            <Link className='link' to="/">
                Programming & Tech
            </Link>
            <Link className='link' to="/">
                Business
            </Link>
            <Link className='link' to="/">
                Lifestyle
            </Link>
        </div>
        <hr />
        </>
        }
    </div>
  )
}

export default Navbar