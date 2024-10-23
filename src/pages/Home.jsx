import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Grid,
  Rating,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginModal from "../Auth/LoginModal";
// slider navigation //
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { id } = useParams();
  const { addItemToCart, isItemAdded } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const url = `https://fakestoreapi.com/products`;
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsLoginModalOpen(false);
      } else {
        setUser(null);
        alert("Please login to explore our products!");
        setIsLoginModalOpen(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <Box className="background">
        <Box className="container mx-auto text-center p-4 flex justify-center">
          <Typography gutterBottom variant="h3" component="div">
            Welcome to reactShopping, the shopping experience like a wow!
          </Typography>
        </Box>

        {/* Hero Section */}
        <Box className="container mx-auto pb-8 mt-10 sm:pb-0">
          {/* Slider */}
          {loading ? (
            <Typography variant="h4" align="center">
              Loading...
            </Typography>
          ) : products.length > 0 ? (
            <Slider {...settings}>
              {products.map((product) => (
                <Box
                  key={product.id}
                  className="flex flex-col items-center p-4"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-auto h-64 object-contain mx-auto"
                  />
                  <Typography variant="h5" align="center" gutterBottom>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {product.description}
                  </Typography>
                  <Link to={`/products/${product.id}`}>
                    <Box display="flex" justifyContent="center" margin={2}>
                      <Button variant="contained" color="primary">
                        Order Now
                      </Button>
                    </Box>
                  </Link>
                </Box>
              ))}
            </Slider>
          ) : (
            <Typography variant="h4" align="center">
              No products found.
            </Typography>
          )}
        </Box>

        {/* Add some margin to create space between the slider and products */}
        <Typography style={{ marginBottom: "50px" }}></Typography>

        {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}

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
              <Grid container className="container mx-auto py-10 " spacing={4}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <Card
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        transition: "transform 0.3s ease", // Add transition effect
                        "&:hover": {
                          transform: "scale(1.05)", // Scale effect on hover
                        },
                      }}
                    >
                      <Link
                        to={`/products/${product.id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                          flexGrow: 1,
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{ height: 200, objectFit: "cover" }}
                          image={product.image}
                          alt={product.title}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {product.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {product.description}
                          </Typography>
                          <Box display="flex" alignItems="center" mt={1}>
                            <Rating
                              name={`rating-${product.id}`}
                              value={product.rating.rate}
                              precision={0.5}
                              readOnly
                              size="small"
                            />
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ ml: 1 }}
                            >
                              ({product.rating.count} reviews)
                            </Typography>
                          </Box>
                        </CardContent>
                      </Link>
                      <Box display="flex" justifyContent="flex-end" p={2}>
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
      </Box>
    </>
  );
}

export default Home;
