import React from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom';
import './header.scss'

import Logo from '/src/assets/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';

const Header: React.FC = () => {
  const navigate = useNavigate()
  const handleClick: Function = () => {
    localStorage.setItem("logged", "false")
    window.location.reload()
  }

  return (
    <div id="header">
      <div className="logoContainer">
        <Link to="/">
          <img className="logo" src={Logo} alt="" />
        </Link>
      </div>
      <div className="logoutContainer">
        <LogoutIcon onClick={() => handleClick()} className='logout' />
      </div>
    </div>
  )
}

export default Header