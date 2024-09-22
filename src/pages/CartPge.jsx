import React, { useContext } from "react";
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

function CartPage() {
  const { cartItems, removeItemFromCart, totalPrice, totalQuantity, isItemAdded, lessQuanityFromCart } = useContext(CartContext);

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
                          <Grid item xs={4} sm={3}>
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              style={{ width: "100%", borderRadius: "8px" }}
                            />
                          </Grid>

                          <Grid item xs={8} sm={6}>
                            <ListItemText
                              primary={item.title}
                              secondary={`Price: $${item.price} | Quantity: ${item.quantity}`}
                            />
                          </Grid>

                          <Grid item xs={2} sm={3} textAlign="right">
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

            {/* Summary Section */}
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
