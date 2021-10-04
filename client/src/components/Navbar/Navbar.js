import React, { useState } from 'react'

import { Avatar } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

import './styles.css'

const Navbar = ({ user }) => {
    const capitalize = (str) => {
        const lowerStr = str.toLowerCase()
        return str.charAt(0).toUpperCase() + lowerStr.slice(1)
    }
    const [isClicked, setIsClicked] = useState(true)
    const [isDrop, setIsDrop] = useState(false)

    const dropFunc = () => {
        if (isDrop)
            setIsDrop(false)
        else
            setIsDrop(true)
    }

    const doSth = () => {
        setIsClicked((isClicked) => !isClicked)
        if (isClicked){
            document.querySelector('.nav__data').classList.add('rightNav')
        } else {
            document.querySelector('.nav__data').classList.remove('rightNav')
        }
    }

    return (
        <nav className='navbar'>
            <div className='nav__logo'>SHARE</div>

            <div className='nav__data'>
                <div className='nav__link' onClick={() => window.location.href='/'}><HomeIcon />&nbsp;Home</div>
                {
                    user ? (
                        <>
                            <div className='nav__link' onClick={() => window.location.href='/article'}><DescriptionIcon />&nbsp;Articles</div>
                            <div className='nav__link' onClick={() => dropFunc()}>
                                <Avatar src={user.profilePic} variant='circle' style={{ width: '25px', height: '25px' }} />&nbsp;{capitalize(user.firstName)}&nbsp;
                                {
                                    isDrop ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
                                }
                            </div>
                            {
                                isDrop ? (
                                    <div className='dropdown'>
                                        <div className='dropdown__item' onClick={() => window.location.href='/user/profile'}><PersonIcon />&nbsp;Profile</div>
                                        <div className='dropdown__item' onClick={() => window.location.href='/user/changePassword'}><SettingsIcon />&nbsp;Change Password</div>
                                        <div className='dropdown__item' onClick={() => {
                                            localStorage.clear()
                                            window.location.href = '/user/login'
                                        }}><ExitToAppIcon />&nbsp;Logout</div>
                                    </div>
                                ) : null
                            }
                        </>
                    ) : (
                        <>
                            <div className='nav__link' onClick={() => window.location.href='/user/login'}><ExitToAppIcon />&nbsp;Login</div>
                            <div className='nav__link' onClick={() => window.location.href='/user/signUp'}><PersonAddIcon />&nbsp;Sign Up</div>
                        </>
                    )
                }
            </div>

            <div className='ham' onClick={doSth}>
                {/* <span className='line'></span> */}
                {
                    isClicked ? (
                        <MenuIcon />
                    ) : (
                        <CloseIcon />
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar
