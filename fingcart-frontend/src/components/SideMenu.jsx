import React, { useState } from 'react';



function SideMenu() {

  // const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // const handleSideMenu = () => {
  // setIsSideMenuOpen(!isSideMenuOpen);
// }

  return (
    <div>
       
       
        <div className="side-menu">
           <div className="side-menu-body">
            <ul className="smenu-ul">
                 <li className="smenu-li"><a className="smenu-a" href="#"> Bestsellers</a></li>
                 <li className="smenu-li"><a className="smenu-a" href="#"> Today's Deals</a></li>
                 <li className="smenu-li"><a className="smenu-a" href="#"> Home</a></li>
                 <li className="smenu-li"><a className="smenu-a" href="#"> Laptops</a></li>
                 <li className="smenu-li"><a className="smenu-a" href="#"> Mobiles</a></li>
                 <li className="smenu-li"><a className="smenu-a" href="#"> Fashion</a></li>
                 <li className="smenu-li"><a className="smenu-a" href="#"> Cars</a></li>
                 <li className="smenu-li"><a className="smenu-a" href="#"> Electronics</a></li>
                 <li className="smenu-li"><a className="smenu-a" href="#"> Motor Bikes</a></li>
                 <li className="smenu-li"><a className="smenu-a" href="#"> Books</a></li>
                 <li className="smenu-li"><a className="smenu-a" href="#"> Home & Kitchen</a></li>
                 <li className="smenu-li"><a className="smenu-a" href="#"> Customer Services</a></li>
            </ul>
           </div>
          <button className="close-button">X</button>
        </div>

    </div>
  )
}

export default SideMenu;