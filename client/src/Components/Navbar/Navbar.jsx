import React, { useState } from 'react'
import { Avatar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined'

import { IMG_URL } from '../../config';
import { isDesktopApp } from '../../config';
import './Navbar.css'

const Navbar = ({ user }) => {
    const [navOpen, setNavOpen] = useState(0)
    const [hover, setHover] = useState(0)

    const redirect = (src) => {
        window.location.href = src
    }
    const handleLogout = () => {
        localStorage.clear()
        redirect('/')
    }

    return (
        <nav className='navbar' style={{ top: isDesktopApp ? '30px' : '0' }}>
            <div className='navbar__left'>
                SHARE
            </div>

            <div className={`navbar__right ${navOpen ? 'navbar__right__show' : ''}`}>
                <div className="nav__link" onClick={() => redirect('/')}><HomeIcon />&nbsp;Home</div>
                {
                    user ? (
                        <>
                            <div className='nav__link' onClick={() => redirect('/article')}><ForumOutlinedIcon />&nbsp;Articles</div>
                            <div className="nav__link" onClick={() => redirect('/chat')}><MessageOutlinedIcon />&nbsp;Chat</div>
                            <div className='nav__link dropdown__link' onMouseOver={() => setHover(1)} onMouseLeave={() => setHover(0)}>
                                <Avatar variant='circular' className='navbar__avatar' style={{ marginRight: '8px' }} src={ user.profilePic !== '' ? IMG_URL+user.profilePic : null } />
                                {
                                    user.firstName
                                }&nbsp;
                                {
                                    hover ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                                }

                                <div className="dropdown">
                                    <div className="dropdown__filler"></div>
                                    <div className="dropdown__content">
                                        <div className="dropdown__item" onClick={() => redirect(`/user/profile/${user.userName}`)}><PersonIcon />&nbsp;Profile</div>
                                        <div className="dropdown__item" onClick={() => redirect('/user/editProfile')}><SettingsIcon />&nbsp;Edit</div>
                                        <div className="dropdown__item" onClick={handleLogout}><ExitToAppIcon />&nbsp;Logout</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='nav__link' onClick={() => redirect('/user/register')}><PersonAddIcon />&nbsp;Sign Up</div>
                            <div className='nav__link' onClick={() => redirect('/user/login')}><ExitToAppIcon />&nbsp;Login</div>
                        </>
                    )
                }
            </div>

            <div className="navbar__ham" onClick={() => setNavOpen(!navOpen)}>
                {
                    navOpen ? <CloseIcon /> : <MenuIcon />
                }
            </div>
        </nav>
    )
}

export default Navbar
