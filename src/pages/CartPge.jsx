import React, { useContext } from "react";
import Checkout from "../components/Checkout";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { CartContext } from "../context/CartContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function CartPage() {
  const { cartItems, removeItemFromCart, updateToCart } = useContext(CartContext);
  console.log("cartItems:", cartItems)

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Box sx={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" color="textSecondary">
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {/* Cart Items List */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ padding: "1rem" }}>
                <List>
                  {cartItems.map((item) => (
                    <div key={item.id}>
                      <ListItem>
                        <Grid container alignItems="center" spacing={2}>
                          {/* Product Image */}
                          <Grid item xs={4} sm={3}>
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              style={{ width: "100%", borderRadius: "8px" }}
                              />
                          </Grid>

                          {/* Product Details */}
                          <Grid item xs={8} sm={6}>
                            <ListItemText
                              primary={item.title}
                              secondary={`Price: $${item.price} | Quantity: ${item.quantity}`}
                            />
                          </Grid>

                          {/* Quantity Update Controls */}
                          <Grid item xs={6} sm={3} textAlign="right">
                            <IconButton
                              aria-label="decrease"
                              onClick={() => updateToCart(item.id, "minus")}
                              disabled={item.quantity <= 1}
                              color="primary"
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography variant="body1" component="span">
                              {item.quantity}
                            </Typography>
                            <IconButton
                              aria-label="increase"
                              onClick={() => updateToCart(item.id, "plus")}
                              color="primary"
                            >
                              <AddIcon />
                            </IconButton>
                          </Grid>

                          {/* Delete Button */}
                          <Grid item xs={2} sm={1} textAlign="right">
                            <IconButton
                              aria-label="delete"
                              onClick={() => removeItemFromCart(item.id)}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Order Section */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ padding: "1rem" }}>
                <Typography variant="h5" gutterBottom>
                  Order Summary
                </Typography>
                <Divider />
                <List>
                  <ListItem>
                    <ListItemText primary="Total Quantity" />
                    <Typography variant="body1">{totalQuantity}</Typography>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Total Price" />
                    <Typography variant="h6" color="primary">
                      ${totalPrice.toFixed(2)}
                    </Typography>
                  </ListItem>
                </List>

                <Button
                  onClick={Checkout}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                >
                  Proceed to Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default CartPage;
