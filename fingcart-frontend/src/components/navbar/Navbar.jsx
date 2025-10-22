import React from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';
// import { useProductsByCategory } from '../../context/ProductByCategoryContext';

function Navbar() {
  const navCategories = [
     {name: 'Bestsellers'},
     {name: `Today's Deals`},
     {name: 'Home'},
     {name: 'Laptops', },
     {name: 'Mobiles'},
     {name: 'Fashion'},
     {name: 'Cars'},
     {name: 'Electronics'},
     {name: 'Motor Bikes'},
     {name: 'Books'},
     {name: 'Home & Kitchen'},
     {name: 'Customer Services'},
  ];

  // const {products} = useProductsByCategory();
  
  return (
    <div>
      
      <nav className="nav-bar">
        <div className="menu-box">
            <a className="nav-menu-a" href="#">
              <div className="menu-icon">
                <div className="three-bar"></div>
                <div className="three-bar"></div>
                <div className="three-bar"></div>
              </div>
              <p className="all-menu"> All</p>
            </a>
        </div>


        <ul className="nav-ul">
          {navCategories && navCategories.length > 0 ? (
            navCategories.map((category) => (
              <li key={category.name} className="nav-li">
                {/* <Link
                  className="nav-a"
                  to={`/category/${category.name.toLowerCase().replace(/ & /g, '-')}`}
                > */}
                <Link className="nav-a"
                  to={`/category/${encodeURIComponent(category.name)}`} >
                  {category.name}
                </Link>
              </li>
            ))
          ) : (
            <li className="nav-li">No categories available</li>
          )}
        </ul>
      </nav>

    </div>
  )
}

export default Navbar;