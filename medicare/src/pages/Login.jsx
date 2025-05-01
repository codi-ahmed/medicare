import React from 'react'
import  { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../style/login.css'


const   Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
    
        try {
          const res = await axios.post('http://localhost:3000/api/admin/login', {
            user,
            password,
          });

    
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('adminName', res.data.admin.name );
          localStorage.setItem('adminId',  res.data.admin.id);
          localStorage.setItem('adminUser', res.data.admin.user );
    
          navigate("/admin");
          
        } catch (err) {
          setErrorMsg(err.response?.data?.message || 'Login failed');
        }
      };


  return (
    <div className='login-body'>
         <div className="login_nav">
    <div className="login_nav_left"><Link to="/"><img className='login_nav_img' src="../../public/medicare.png" alt="medicare" /></Link></div>
    <div className="login_nav_right"><h2>Welcome to Admin Portal</h2></div>
  </div>
    <div className="signin-container">
             
    <form className="signin-form" onSubmit={handleSubmit}>
      <h2>Login In to <strong>Admin</strong> Portal</h2>

      <input
        type="text"
        placeholder="Username"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {errorMsg && <p className="error">{errorMsg}</p>}

      <button type="submit">Sign In</button>

      <p className="note">Account is created by organizers through the portal.</p>
    </form>
  </div>
  </div>
  )
}

export default Login
