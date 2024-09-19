import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, MenuItem, Menu, SwipeableDrawer, Dialog, DialogContent, CircularProgress, Tooltip } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import InfoIcon from '@mui/icons-material/Info';
import ChatPage from './ParentChat'; // Import the ChatPage component
import PasswordChangePage from './PasswordChange'; // Import PasswordChangePage component
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const [childDetails, setChildDetails] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [photoUrl, setPhotoUrl] = useState(null);
    const navigate = useNavigate();
    const id = sessionStorage.getItem('UserId');

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const openModal = () => {
        setModalOpen(true);
        handleClose(); 
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openInfoModal = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8888/child/getChildByParent/${id}`);
            console.log('Fetched Child Details:', response.data);
            if (response.data.length > 0) {
                const child = response.data[0];
                setChildDetails(child);
                
                setInfoModalOpen(true);
            } else {
                setError('No child details found.');
            }
        } catch (error) {
            console.error('Error fetching child details:', error);
            setError('Failed to fetch child details');
        } finally {
            setLoading(false);
        }
    };

    const closeInfoModal = () => {
        setInfoModalOpen(false);
        setChildDetails(null);
        setPhotoUrl(null);
    };

    useEffect(() => {
        if (id === null) {
            navigate('/');
        }
    }, [id, navigate]);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Anganwadi Parent Services
                    </Typography>
                    <div>
                    <Tooltip title="Messages" placement="top" arrow>
            <IconButton
                color="inherit"
                onClick={toggleDrawer(true)}
                aria-label="Messages"
            >
                <MailIcon />
            </IconButton>
        </Tooltip>

                    <Tooltip title="Child Details" placement="top" arrow>
            <IconButton
                color="inherit"
                onClick={openInfoModal}
                aria-label="Details"
            >
                <InfoIcon />
            </IconButton>
        </Tooltip>
                       


                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleMenu}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={openModal}>Change Password</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <ChatPage />
            </SwipeableDrawer>
            <Dialog open={modalOpen} onClose={closeModal} fullWidth maxWidth="sm">
                <DialogContent style={{ position: 'relative' }}>
                    <PasswordChangePage />
                    <IconButton
                        onClick={closeModal}
                        color="primary"
                        style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogContent>
            </Dialog>
            <Dialog open={infoModalOpen} onClose={closeInfoModal} fullWidth maxWidth="sm">
                <DialogContent style={{ position: 'relative' }}>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <CircularProgress />
                        </div>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : childDetails ? (
                        <div>
                            <Typography variant="h6">Child Details</Typography>
                            <Typography>Name: {childDetails.name || 'N/A'}</Typography>
                            
                            <Typography>Deficiency: {childDetails.deficiency || 'N/A'}</Typography>
                            <Typography>Nutritional Status: {childDetails.nutritionalStatus || 'N/A'}</Typography>
                            <Typography>Height: {childDetails.height || 'N/A'}</Typography>
                            <Typography>Weight: {childDetails.weight || 'N/A'}</Typography>
                        </div>
                    ) : (
                        <Typography>No child details available</Typography>
                    )}
                    <IconButton
                        onClick={closeInfoModal}
                        color="primary"
                        style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Navbar;
