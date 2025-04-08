import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Button, AppBar, Box, Toolbar, Typography, Menu, Avatar, MenuItem, IconButton,
} from '@mui/material';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { userDataContext } from '../context';
import ThemeContext from '../context/themeContext';
import Logo from '../assets/img/logo.png';
import { padding } from '@mui/system';

export { ProtectedUser } from '../routes/protected';

const pages = [
  { title: 'Home', link: '/' },
  { title: 'Therapists', link: '/therapists' },

];
const settings = ['Profile'];

const Navbar = () => {
  const userData = useContext(userDataContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const themes = useContext(ThemeContext);
  const navigate = useNavigate();
    
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    userData?.setUserData(null);
    navigate('/');
  };
  return (

    <AppBar position="static" sx={{ backgroundColor: themes?.themeMode === 'dark' ? '#181A1B' : ' #F4F7FF', color: '#516EFF' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <img src={Logo} alt="logo" style={{ width: '160px' }} />
          </Link>
          <IconButton
            aria-label="Toggle theme mode"
            onClick={themes?.handleThemeModeSwitch}
            color="inherit"
            sx={{ padding: '0' }}
          >
            {themes?.themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ padding: '0', px: '0.5rem' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Link
                    to={page.link}
                    key={page.title}
                    style={{ textDecoration: 'none', color: '#516EFF' }}
                  >
                    <Typography textAlign="center">
                      {page.title}

                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
                to={page.link}
                key={page.title}
                style={{ textDecoration: 'none', color: '#516EFF' }}
              >
                <Button
                  key={page.title}
                  variant="outlined"
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: '#516EFF',
                    display: 'block',
                    ml: 2,
                    '&:hover': {
                      backgroundColor: '#7100FF',
                      color: '#fff',

                    },

                  }}
                >
                  {page.title}
                </Button>
              </Link>

            ))}

          </Box>

          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            {userData?.userData ? (

              <>
                <Button onClick={handleOpenUserMenu} sx={{ p: "0 0.25rem", }}>
                  <Typography sx={{ color: '#516EFF', fontWeight: 'bold', display: { xs: 'none', sm: 'block' }}}>
                    {userData?.userData.fullName || 'ADMIN'}
                  </Typography>

                  <Avatar
                    alt="user avatar"
                    src={`${userData?.userData?.profileImg}?timestamp=${Date.now()} || 'https://2u.pw/boTFzk6'`}
                    sx={{ ml: 1 }}
                  />
                </Button>

              </>

            ) : (
              <>
                <Link to="/login" style={{ textDecoration: 'none', color: 'white', width: 'fit-content' }}>
                  <Button variant="contained" sx={{ borderColor: 'primary.main', fontSize: { xs: '13px', sm: '14px' }, textTransform: 'none' }}>

                    SignIN

                  </Button>
                </Link>
                <Link to="/signup" style={{ textDecoration: 'none', color: 'white', width: 'fit-content' }}>
                  <Button variant="contained" sx={{ borderColor: 'primary.main', fontSize: { xs: '13px', sm: '14px' }, textTransform: 'none' }}>

                    SignUp

                  </Button>
                </Link>
              </>
            )}

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                    {userData?.userData?.role === 'therapist' && (
                      <>
                        <MenuItem  onClick={handleCloseUserMenu}>
                          <Typography sx={{ color: '#516EFF', fontWeight: 'bold', display: { xs: 'block', sm: 'none' }}}>
                            {userData?.userData.fullName || 'ADMIN'}
                          </Typography>
                        </MenuItem>
                        <MenuItem  onClick={handleCloseUserMenu}>
                          <Link to={`/therapist/${userData?.userData?.therapistId}`} style={{ textDecoration: 'none', fontWeight: 'bold' }}>
                            <Typography textAlign="center" sx={{ width: '120px' }}>

                              <AccountCircleIcon style={{
                                position: 'absolute', top: '5', left: '22',
                              }}
                              />
                              profile
                            </Typography>
                          </Link>
                        </MenuItem>
                        <MenuItem  onClick={handleCloseUserMenu}>
                          <Box onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                            <Link to={'/'} >Sign out</Link>
                            <LogoutIcon onClick={handleLogout} sx={{ cursor: 'pointer' }} />
                          </Box>
                        </MenuItem>
                      </>
                    )}
                    {userData?.userData?.role === 'user' && (
                      <>
                        <MenuItem  onClick={handleCloseUserMenu}>
                          <Typography sx={{ color: '#516EFF', fontWeight: 'bold', display: { xs: 'block', sm: 'none' }}}>
                            {userData?.userData.fullName || 'ADMIN'}
                          </Typography>
                        </MenuItem>
                        <MenuItem  onClick={handleCloseUserMenu}>
                          <Box onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                            <Link to={'/'} >Sign out</Link>
                            <LogoutIcon onClick={handleLogout} sx={{ cursor: 'pointer' }} />
                          </Box>
                        </MenuItem>
                      </>
                    )}
                    {userData?.userData?.role === 'admin' && (
                     <>
                        <MenuItem  onClick={handleCloseUserMenu}>
                          <Typography sx={{ color: '#516EFF', fontWeight: 'bold', display: { xs: 'block', sm: 'none' }}}>
                            {userData?.userData.fullName || 'ADMIN'}
                          </Typography>
                        </MenuItem>
                        <MenuItem  onClick={handleCloseUserMenu}>
                          <Link to="/admin/therapists">Dashboard</Link>
                        </MenuItem>
                        <MenuItem  onClick={handleCloseUserMenu}>
                          <Box onClick={handleLogout} sx={{ display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                            <Link to={'/'} >Sign out</Link>
                            <LogoutIcon onClick={handleLogout} sx={{ cursor: 'pointer' }} />
                          </Box>
                        </MenuItem>
                     </>
                    )}
           
        
              </Menu>
           

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
