import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Button,
  Modal,
} from "@mui/material";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const [open, setOpen] = useState(false); 
  const [product, setProduct] = useState(null);
  
  const { addItemToCart, isItemAdded, cartItems } = useContext(CartContext);

  const handleOpen = (selectedProduct) => {
    setProduct(selectedProduct);
    setOpen(true);
  };

  const handleClose = () => {
    setProduct(null);
    setOpen(false);
  };

  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };

  
  const { thumbnail = '', category = '', title = '', price = '', description = '' } = product || {};

  return (
    <div>
      <Button onClick={() => handleOpen(cartItems[0])}>Open modal</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title || "No product available"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description || "No description available"}
          </Typography>
          {thumbnail && <img src={thumbnail} alt={title} style={{ width: "100%", borderRadius: "8px" }} />}
          <Typography>Price: ${price}</Typography>
          <Typography>Category: {category}</Typography>
          <Button onClick={() => addItemToCart(product)} disabled={isItemAdded(product?.id)}>
            Add to Cart
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Checkout;
