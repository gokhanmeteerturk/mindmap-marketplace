import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalGroceryStoreTwoToneIcon from '@mui/icons-material/LocalGroceryStoreTwoTone';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Create from '../pages/Create';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import PrivateRoute from '../components/PrivateRoute';
import { useContext } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import CartPopover from '../components/CartPopover';
import { CartProvider, useCart } from '../context/CartContext';

const drawerWidth = 240;

function NavbarContent (props) {
  const { user, logout } = useContext(AuthContext);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  // Inside NavbarContent component, add these lines before the return statement
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { cart } = useCart();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleCartClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleCartClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem key={"Home"} disablePadding>
          <ListItemButton component={Link} to={"/"} selected={"/" === path}>
            <ListItemIcon>
              <LocalGroceryStoreTwoToneIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={"Marketplace"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"About"} disablePadding>
          <ListItemButton component={Link} to={"/about"} selected={"/about" === path}>
            <ListItemIcon>
              <InfoTwoToneIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={"About"} />
          </ListItemButton>
        </ListItem>
        {user && (
        <ListItem key={"Create"} disablePadding>
          <ListItemButton component={Link} to={"/create"} selected={"/create" === path}>
            <ListItemIcon>
              <ControlPointTwoToneIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={"Create"} />
          </ListItemButton>
        </ListItem>
      )}
      </List>
      <Divider />
      <List>
        {user ? (
          <ListItem key={"Logout"} disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutTwoToneIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem key={"Login"} disablePadding>
            <ListItemButton component={Link} to={"/login"} selected={"/login" === path}>
              <ListItemIcon>
                <LoginTwoToneIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            {path === "/" ? "Mindmaps Marketplace" : 
             path === "/about" ? "About" : 
             path === "/create" ? "Create" :
             path === "/login" ? "Login" : ""}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
<IconButton
  color="inherit"
  onClick={handleCartClick}
  sx={{ ml: 2 }}
>
  <Badge badgeContent={cart.length} color="error">
    <ShoppingCartIcon />
  </Badge>
</IconButton>
<CartPopover
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleCartClose}
/>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/create' element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          } />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Box>
    </Box>
  );
}

const Navbar = () => {
  return (
    <AuthProvider>
      <CartProvider>
      <NavbarContent />
       </CartProvider>

    </AuthProvider>
  );
};
Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;