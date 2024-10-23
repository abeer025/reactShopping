import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Card as MUICard,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

function Card({ item }) {
  const { category, title, price, id, rating, image } = item;
  const { addItemToCart, isItemAdded } = useContext(CartContext);

  return (
    <MUICard className="w-full max-w-xs shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <Link to={`/products/${id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
          className="object-cover object-center"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {category}
          </Typography>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            ${price}
          </Typography>
          <Box display="flex" alignItems="center" mt={1}>
            <Rating
              name={`rating-${id}`}
              value={rating.rate}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({rating.count} reviews)
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end" p={2}>
            {/* Add to Cart Button */}
            <Button
              onClick={() => addItemToCart(product)}
              variant="contained"
              color="primary"
              sx={{ marginTop: "5px", marginLeft: "8px" }}
            >
              {isItemAdded(item.id)
                ? `Added (${isItemAdded(item.id).quantity})`
                : "Add to Cart"}
            </Button>
          </Box>
        </CardContent>
      </Link>
    </MUICard>
  );
}

export default Card;
