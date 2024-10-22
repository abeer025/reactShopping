import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { auth } from "../utils/firebase";

const CheckOutModal = ({ isModalOpen, handleOk, checkoutOrder, handleCancel }) => {
  const [continueAsGuest, setContinueAsGuest] = useState(false);
  const isLogin = auth.currentUser;

  useEffect(() => {
    return () => setContinueAsGuest(false);
  }, []);

  return (
    <Dialog open={isModalOpen} onClose={handleCancel}>
      <DialogTitle>Checkout Modal</DialogTitle>
      <DialogContent>
        {!isLogin && !continueAsGuest && (
          <div className="flex flex-col items-center">
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              Login to Save your Order's and See Progress
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 2 }}>
              ----- OR -----
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setContinueAsGuest(true)}
            >
              Continue as a Guest
            </Button>
          </div>
        )}

        {(isLogin || continueAsGuest) && (
          <form onSubmit={checkoutOrder}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              name="username"
              required
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              name="email"
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              margin="normal"
              type="number"
              name="number"
              required
            />
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              name="address"
              required
            />
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="secondary">
          Cancel
        </Button>
        {(continueAsGuest || isLogin) && (
          <Button onClick={checkoutOrder} color="primary">
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CheckOutModal;
