import React from 'react'
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../style/sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogOut = () =>{
      localStorage.removeItem('token');
      navigate('/login')
  }

  return (
    <div className='sidebar_parent'>
    <div className='sidebar_admin'>
      <NavLink to="create-company" className="no-underline"><div className="sidebar_btn">Add Company</div></NavLink>

      <NavLink to="add-product" className="no-underline"><div className="sidebar_btn">Add Product</div></NavLink>

      <NavLink to="change-detail" className="no-underline"><div className="sidebar_btn">Change Detail</div></NavLink>

      <NavLink to="change-price" className="no-underline"><div className="sidebar_btn">Change Price</div></NavLink>

      <NavLink to="pending-order" className="no-underline"><div className="sidebar_btn">Pending Orders</div></NavLink>

      <NavLink to="total-sale" className="no-underline"><div className="sidebar_btn">Total Sales</div></NavLink>

    </div>
    <div className="logout_btn" onClick={handleLogOut}><div><i class="fas fa-sign-out-alt"></i> Logout</div></div>
</div>
  )
}

export default Sidebar
