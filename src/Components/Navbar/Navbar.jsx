import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { logout } from '../../Stores/AccessTokenStore';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAuthContext } from '../../Contexts/AuthContext';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [method] = React.useState('');
  const navigate = useNavigate();
  
  const { user } = useAuthContext();
  
  
  const settings = ['Profile', 'Logout'];
  const pages =[]

  switch (user.role) {
    case 'Administrador SinCeO2':
      pages.push('Clientes', 'Cursos', 'Usuarios');
      break;
    case 'Administrador':
      pages.push('Mis Cursos', 'Usuarios');
      break;
      case 'Usuario':
      pages.push('Mis Cursos');
      break;
    default:
      break;
  }
 
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log(event.currentTarget)
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleRoute = (event) => {
    console.log(event.target.innerText)
    switch (event.target.innerText) {
      case 'Clientes':
        handleRouteClick('Clients')
        break;
      case 'Cursos':
        handleRouteClick('Courses')
        break;
      case 'Mis Cursos':
        handleRouteClick(`MyCourses/${user.id}`)
        break;
      case 'Usuarios':
        handleRouteClick('Users')
        break;
      default:
        break;
    }
  }

  const handleRouteClick = (page) => {
    navigate(`/${page.toLowerCase()}`);
    console.log(page)
  }
  
  const handleSettingsClick = (setting) => {
    switch (setting) {
      case 'Profile':
        navigate(`/users/profile/${user.id}`);
        break;
      case 'Logout':
        logout();
        break;
      default:
        break;
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={`/mycourses/${user.id}`}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {user.company.name}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link href={method} sx={{ textDecoration: 'none' }} onClick={(event) => handleRoute(event)}>
                  <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href={`/mycourses/${user.id}`}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {user.company.name}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
              href={method}
                key={page}
                onClick={(event) => handleRoute(event)}
                sx={{ my: 2, color: 'white', display: 'block', marginLeft: 2 }}
              >
                {page}
              </Link>
            ))}
          </Box>

        {/* AVATAR */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user.avatar} />
              </IconButton>
            </Tooltip>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleSettingsClick(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
