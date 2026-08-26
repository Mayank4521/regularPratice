import React, { useState } from "react";
import "../shared/nav.scss";
import { useNavigate } from "react-router";
import SideMenu from "./SideMenu";

const Nav = () => {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleMenu= ()=>{
        setIsMenuOpen((prev)=>!prev)
    }
    
  return (
    <>
    <nav className="nav-bar">
      <h1 onClick={()=>navigate('/')}>InstaClone</h1>
      <div className="nav-buttons">
        <button
          onClick={() => navigate("/create-post")} >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM5 5V19H19V5H5ZM11 11V7H13V11H17V13H13V17H11V13H7V11H11Z"></path>
          </svg>
        </button>
        <button onClick={handleMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
        </button>
      </div>
    </nav>
    {isMenuOpen && <SideMenu/>}
    </>
  );
};

export default Nav;
