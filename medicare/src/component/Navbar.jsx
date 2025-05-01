import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/navbar.css'

const Navbar = () => {
const navigate = useNavigate();

const addToCart = () => {
  navigate('/cart');
};

  return (
    <div className='nav_body'>
      <div className="left_nav_side">
        <Link to="/">
        <img className='logo_nav_img' src="../../public/medicare.png" alt="medicare logo" /></Link>
      </div>
      <div className="right_nav_side">
        <ul className='list_nav'>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><a href="#product" className="nav-link">Product</a></li>
          <li><a href='#pharma-section' className="nav-link">Pharma</a></li>
          <li><Link to="/contact" className="nav-link">Contact</Link></li>
          <li><a href="#about" className="nav-link">About</a></li>
        </ul>
        <div className="nav_cart" onClick={addToCart}>
          <img className='cart_nav_img' src="../../public/cartlogo.png" alt="cartLogo" />
          <p>CART</p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
