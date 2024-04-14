import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Link } from '@mui/material';
import { AccountCircle, CloudUpload, Logout, Key } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link onClick={() => navigate('/')} style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>
            OnlyMemes
          </Link>
        </Typography>
        <IconButton
          color="inherit"
          onClick={() => navigate('/invite')}>
          <Key />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => navigate(`/profile/${user?.id}`)}
          sx={{ marginRight: '10px' }}>
          <AccountCircle />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => navigate('/upload')}
          sx={{ marginRight: '10px' }}>
          <CloudUpload />
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate('/logout')}>
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
