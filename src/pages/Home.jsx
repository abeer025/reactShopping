import axios from "axios";
import { useEffect, useState } from "react";
import Products from "./Products";
import { Card, CardContent, CardMedia, Grid, Typography, Button } from '@mui/material';

function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const productLimit = 5; // Limit the number of products displayed

  // Fetch limited products
  useEffect(() => {
    const url = `https://dummyjson.com/products?limit=${productLimit}`; // Limit to 5 products
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
    <div className="container mx-auto p-4">
      Welcom to reactShopping
    </div>
    <div className="container mx-auto">
    {loading ? (
      <Typography variant="h4" align="center">Loading...</Typography>
    ) : (
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
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
                <Button variant="contained" color="primary">
                  View Product
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}
  </div>
    </>

  );
}

export default Home;