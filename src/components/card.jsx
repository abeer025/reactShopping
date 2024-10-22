import { Link } from "react-router-dom";
import { Box, Typography, Card as MUICard, CardMedia, CardContent, Grid } from "@mui/material";

function Card({ item }) {
  const { category, title, price, id, description, image } = item;

  return (
    <MUICard className="lg:w-1/4 md:w-1/2 p-4 w-full shadow">
      <Link to={`/products/${id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="100"
          image={item.image}
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
        </CardContent>
      </Link>
    </MUICard>
  );
}

export default Card;
