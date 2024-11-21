// CartPopover.jsx
import React from 'react';
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Button,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../context/CartContext';

const CartPopover = ({ anchorEl, onClose, open }) => {
  const { cart, totalPrice, removeFromCart } = useCart();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Box sx={{ width: 320, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Shopping Cart</Typography>
        {cart.length === 0 ? (
          <Typography color="text.secondary">Your cart is empty</Typography>
        ) : (
          <>
            <List sx={{ mb: 2 }}>
              {cart.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      onClick={() => removeFromCart(item.name)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText 
                    primary={item.name}
                    secondary={`${item.price_gbp} GBP`}
                  />
                </ListItem>
              ))}
            </List>
            <Divider />
            <Box sx={{ 
              mt: 2, 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Total: {totalPrice.toFixed(2)} GBP
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => {
                  // Add checkout logic here
                  console.log('Proceeding to checkout...');
                }}
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Popover>
  );
};

export default CartPopover;