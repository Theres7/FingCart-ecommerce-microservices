import React, { useEffect, useState } from 'react';
import logo from '../assets/FingCart.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FaSearch } from 'react-icons/fa';
import './Header.css'
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';

function Header() {
  const [user, setUser] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('username');
    if (savedUser) {
      setUser(savedUser); 
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('jwtToken');
    setUser('');
  };

  
  return (
    <div>
      <header>
        <div className="header-div" >
          <div className="logo-container">
            <img id="logo" src={logo} alt="Logo" />
          </div>
          <div className="search-container">

            <form id="search-form">
              <select id="select-items" name="select-item">
                <option>All</option>
              </select>

              <input type="text" id="search-box" placeholder="Search on FingCart" />
              <button className="search-lens" type="submit">
                <FaSearch/>
              </button>
            </form>
          </div>

          <div className="language-container">
            <select id="languages" >
              <option value="english">EN</option>
              <option value="hindi">HI</option>
              <option value="tamil">TA</option>
              <option value="malayalam">ML</option>
            </select>
          </div>

          <div className="header-heads" >
            <ul className="header-ul">   
              <li className="header-li"><a className="header-a" href="#"> Returns & Orders </a></li>
              <li className="header-li"><a className="header-a" href="#"> <FontAwesomeIcon icon={faShoppingCart} />Cart </a></li>
              <li className="header-li"><Link className="header-a profile" to="/login"> 

                 {user ? user   : "Login / Signup"}
              </Link></li>
            </ul>
              {user && 
                <Button className="header-a logout-button" 
                        variant="contained"
                        onClick={handleLogout}
                        sx={{
                          padding: "4px 10px",
                          fontSize: "0.75rem",
                          minWidth: "auto", 
                        }}>Logout</Button> 
              }
          </div>

          {/* <div className="returns-and-orders header-heads">
          </div>

          <div className="cart header-heads">
          </div> */}
        </div>

      </header>

    </div>
  )
}

export default Header;