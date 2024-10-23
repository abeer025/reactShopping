import React from "react";
import { Container, Typography, Box, Grid, Paper } from "@mui/material";

const About = () => {
  return (
    <Container className="my-10">
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Your One-Stop Shop for Quality Products
      </Typography>
      <Box mt={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body1">
                At reactShopping, our mission is to provide high-quality products
                that enhance your daily life. We believe in sourcing the best
                materials and ensuring every product meets our strict
                quality standards.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Our Values
              </Typography>
              <Typography variant="body1">
                We prioritize customer satisfaction, sustainability, and
                innovation. Our team works tirelessly to bring you the best
                shopping experience while being environmentally conscious.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box mt={4} textAlign="center">
        <Typography variant="h5" component="h2" gutterBottom>
          Join Us on Our Journey!
        </Typography>
        <Typography variant="body1">
          Explore our wide range of products and be a part of our community.
          We look forward to serving you!
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
