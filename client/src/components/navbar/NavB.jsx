import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PersonIcon from '@mui/icons-material/Person';
import Logo from '../../assets/Organ_logo.png'

const NavB = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const Open = Boolean(anchorEl)

    const currPath = window.location.pathname

    // console.log(currPath)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear()
        window.location.pathname = '/login'
    }

    const navigateTo = (path) => {
        window.location.pathname = path
    }

    return (
        <Navbar style={{
            display: currPath === '/login' || currPath === '/register' ? 'none' : ''
        }} collapseOnSelect expand="lg" sticky='top' variant="light" className='bg-dark-purple shadow-my-shadow'>
            <Container>
                <Navbar.Brand onClick={() => navigateTo('/home')} className="nav-title" style={{ cursor: "pointer", fontWeight: "700" }}>
                    <img
                        src={Logo}
                        style={{ marginRight: "10px" }}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    ORGANizer
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                        onClick={() => navigateTo('/home')} 
                        style={{
                            fontWeight: currPath === '/home' ? '700' : '400',
                        }} >
                            Home
                        </Nav.Link>
                        <Nav.Link
                        onClick={() => navigateTo('/application')} 
                        style={{
                            fontWeight: currPath === '/application' ? '700' : '400',
                        }}>
                            Application
                        </Nav.Link>
                        <Nav.Link
                        onClick={() => navigateTo('/hospitals')} 
                        style={{
                            fontWeight: currPath === '/hospitals' ? '700' : '400',
                        }}>
                            Find Hospitals
                        </Nav.Link>
                    </Nav>
                    <Nav className='flex justify-start ms-auto items-start'>
                        <Nav.Link>
                            <div>
                                <IconButton onClick={handleClick} className='flex gap-4'>
                                    <div className='flex items-center'>
                                        <img
                                            className='profile-photo'
                                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                            alt="profile"
                                            width="35" />
                                        <ArrowDropDownIcon className='text-blue' />
                                    </div>
                                </IconButton>
                                <Menu
                                    id='demo-positioned-menu'
                                    aria-labelledby='demo-positioned-button'
                                    anchorEl={anchorEl}
                                    open={Open}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    MenuListProps={{
                                        'aria-labelledby': 'demo-positioned-button',
                                    }}
                                >
                                    <MenuItem onClick={() => navigateTo('/profile')}><PersonIcon sx={{ marginRight: 1 }} />View Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}><LogoutIcon sx={{ marginRight: 1 }} />Logout</MenuItem>
                                </Menu>
                            </div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavB;