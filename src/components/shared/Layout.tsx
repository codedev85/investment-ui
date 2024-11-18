import React from 'react'
import { Outlet ,NavLink  } from 'react-router-dom'
import './Layout.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Layout() {

  const navigate = useNavigate(); 
  const { logout } = useAuth();

  const handleLogout = async () => {
      await logout();
      navigate('/');
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };


  return (
    <div>
      <div className="container">
      {
      isAuthenticated() && 
        <div className="navigation">
          <div className="menu">
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
            <NavLink to="/transaction" className={({ isActive }) => (isActive ? "active" : "")}>
              Transaction
            </NavLink>
             <a className="logout" onClick={handleLogout} >
              LogOut
             </a>
          </div>
        </div>
        }
       
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

