import React from 'react';
import { withRouter } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from '@mui/material/Link';
import logo from '../../../images/logo.svg'
import { VerifiedUserSharp } from '@material-ui/icons';

const pages = ['Home', "Videos", "Images", 'Upload an Image', 'Upload a Video'];
const links = ["/", "/video-gallery", "/image-gallery", '/upload-image', 'upload-video']
const settings = ['Connect your wallet', 'Disconnect', 'Dashboard', 'Logout'];

export const Navbar = withRouter(({account, connectWallet}) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
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
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar alt="Remy Sharp" src={logo} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            POLYMA
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
                    <Link
              href={links[pages.indexOf(page)]} textAlign="center">{page}</Link>
                </MenuItem>
              ))}
               {
  account ? (
    <>

      <Button
        variant="contained"
        className="connected-btn"
        endIcon={<VerifiedUserSharp />}
      >

        Connected to <Typography  className="whiteLink">
        {account.substring(0, 8)}...{account.substring(32, 24)}
      </Typography>
      </Button>
    </>
  ) : (
    <Button
      variant="contained"
      className="connect-wallet-btn"
      ml={2}
      sx={{display: 'flex', borderColor:'white', color:'white'}}
      onClick={() => {
        connectWallet()
      }}
    >
      Connect Wallet
    </Button>
  )
}
              </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            POLYMA
          </Typography>
          <Box sx={{ justifyContent:'space-evenly', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

             {pages.map((page) => (
              <Button

              href={links[pages.indexOf(page)]}
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            {
  account ? (
    <>
      <Button variant="outlined" className="whiteLink" sx={{color:'white'}}>
        {account.substring(0, 8)}...{account.substring(34, 42)}
      </Button>
      <Button

        variant="contained"
        className="connected-btn"
        endIcon={<VerifiedUserSharp />}
      >
        Connected
      </Button>
    </>
  ) : (
    <Button
      variant="outlined"
      className="connect-wallet-btn"
      ml={2}
      sx={{display: 'flex', borderColor:'white', color:'white'}}
      onClick={() => {
        connectWallet()
      }}
    >
      Connect Wallet
    </Button>
  )
}

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
})

