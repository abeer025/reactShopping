import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import {
  Button,
  CircularProgress,
  Typography,
  Grid,
  Box,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";

function ProductDetail() {
  const { id } = useParams();
  const { addItemToCart, isItemAdded } = useContext(CartContext);
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { thumbnail, category, title, price, description } = product;

  useEffect(() => {
    setNotFound(false);
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setNotFound(true);
        setLoading(false);
        console.log(err);
      });
  }, [id]);

  const handleImageClick = () => {
    setOpenDialog(true);
  };

  return (
    <Box sx={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
          <Typography variant="h5">Loading....</Typography>
        </Box>
      ) : notFound ? (
        <Typography variant="h5" align="center">
          Product Not Found
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Box component={Paper} elevation={3} sx={{ padding: "2rem" }}>
              <Typography variant="h4" gutterBottom>
                {title}
              </Typography>

              <Typography variant="body1" gutterBottom>
                {description}
              </Typography>

              <Typography variant="subtitle1" color="textSecondary">
                Category: {category}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "1rem",
                }}
              >
                <Typography variant="h5" color="primary">
                  ${price}
                </Typography>

                {/* Add to Cart Button */}
                <Button
                  onClick={() => addItemToCart(product)}
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "5px", marginLeft: "8px" }}
                >
                  {isItemAdded(product.id)
                    ? `Added (${isItemAdded(product.id).quantity})`
                    : "Add to Cart"}
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <img
              alt={title}
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded cursor-pointer"
              src={thumbnail}
              onClick={handleImageClick}
            />
          </Grid>
        </Grid>
      )}
      {/* Image Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <img
            alt={title} 
            className="w-full object-cover"
            src={thumbnail}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ProductDetail;
