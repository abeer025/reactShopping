import axios from "axios";
import CartPage from "../pages/CartPge";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productLimit = 20;

  // Fetch limited products
  useEffect(() => {
    const url = `https://dummyjson.com/products?limit=${productLimit}`;
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Box className="container mx-auto text-center p-4 flex justify-center">
        <Typography gutterBottom variant="h3" component="div">
          Welcome to reactShopping, the shopping experience like a wow!
        </Typography>
      </Box>

      <Box className="container mx-auto">
        {loading ? (
          <Typography variant="h4" align="center">
            Loading...
          </Typography>
        ) : products.length > 0 ? (
          <>
            <Typography variant="h4" align="center" gutterBottom>
              Find Your Favourite Products
            </Typography>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  {/* Product Card */}
                  <Card>
                    <Link
                      to={`/products/${product.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={product.thumbnail}
                        alt={product.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description}
                        </Typography>
                      </CardContent>
                    </Link>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                component={Link}
                to="/products"
                variant="contained"
                color="primary"
                className="mx-8"
              >
                See All
              </Button>
            </Box>
          </>
        ) : (
          <Typography variant="h4" align="center">
            No products found. Please check back later.
          </Typography>
        )}
      </Box>
    </>
  );
}

export default Home;
