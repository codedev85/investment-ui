import React from 'react'
import { Outlet ,NavLink  } from 'react-router-dom'
import './Layout.css'

export default function Layout() {
  return (
    <div>
      <div className="container">
        <div className="navigation">
          <div className="menu">
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              Home
            </NavLink>
            <NavLink to="/transaction" className={({ isActive }) => (isActive ? "active" : "")}>
              Transaction
            </NavLink>
            <NavLink to="/wallet" className={({ isActive }) => (isActive ? "active" : "")}>
              Wallet
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
              Profile
            </NavLink>
          </div>
        </div>
        {/* This renders child routes */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

