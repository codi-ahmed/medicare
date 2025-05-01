import React from 'react'
import '../style/admin.css'
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Link } from 'react-router-dom';

import Sidebar from '../component/Sidebar'

const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate('/login');
        }
      }, [navigate]);
    
  return (
    <div>
      <div className="admin_nav">
        <div className="admin_nav_left"><Link to="/admin"><img className='admin_nav_img' src="../../public/medicare.png" alt="medicare" /></Link></div>
        <div className="admin_nav_right"><h2>Welcome to Admin Portal</h2></div>
      </div>
      <div className="admin_body">
        <div className="admin_sidebar"><Sidebar /></div>
        <div className="admin_content"><Outlet /></div>
      </div>
    </div>
  )
}

export default Admin
