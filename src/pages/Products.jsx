import axios from "axios";
import { useEffect, useState } from "react";
import Category from "../components/Category";
import Card from "../components/Card";
import { Select, MenuItem, TextField, Button, CircularProgress } from "@mui/material";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chosenCategory, setChosenCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("title"); 
  const [order, setOrder] = useState("asc"); 

  // Fetch products based on search query, Category, sortBy, and order
  useEffect(() => {
    let url = "";

    // Check if searchQuery is set, otherwise fetch by Category and sorting
    if (searchQuery) {
      url = `https://fakestoreapi.com/products?q=${searchQuery}`; // No sorting directly in the API
    } else {
      url =
        chosenCategory === "All"
          ? `https://fakestoreapi.com/products`
          : `https://fakestoreapi.com/products/category/${chosenCategory}`;
    }

    // Fetch products
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        // If sort is selected, apply sorting manually
        const sortedProducts = [...res.data].sort((a, b) => {
          if (sortBy === "title") {
            return order === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
          } else if (sortBy === "price") {
            return order === "asc" ? a.price - b.price : b.price - a.price;
          } else if (sortBy === "rating") {
            return order === "asc" ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate;
          }
          return 0;
        });
        setProducts(sortedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [chosenCategory, searchQuery, sortBy, order]);

  // Fetch product categories
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Handle the search button click
  const handleSearch = () => {
    setSearchQuery(searchQuery);
  };

  return (
    <div className="container mx-auto">
      {loading ? (
        <div className="text-center">
          <CircularProgress />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {/* Search and Category Select */}
          <div className="flex gap-2 justify-between my-10">
            {/* Search Input */}
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
            />

            {/* Category Select */}
            <Select
              value={chosenCategory}
              onChange={(e) => setChosenCategory(e.target.value)}
              fullWidth
            >
              <MenuItem value="All">All Categories</MenuItem>
              {categories.map((CategoryItem) => (
                <MenuItem value={CategoryItem} key={CategoryItem}>
                  {CategoryItem}
                </MenuItem>
              ))}
            </Select>

            {/* Sort By Dropdown */}
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
            </Select>

            {/* Order Dropdown */}
            <Select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>

            {/* Search Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          {/* Categories Filter */}
          <div className="flex gap-3 flex-wrap justify-center">
            <Category
              onClick={() => setChosenCategory("All")}
              isChosen={chosenCategory === "All"}
              Category={{ slug: "All", name: "All" }}
              key="All"
            />
            {categories.map((CategoryItem) => (
              <Category
                onClick={() => setChosenCategory(CategoryItem)}
                isChosen={CategoryItem === chosenCategory}
                Category={{ slug: CategoryItem, name: CategoryItem }}
                key={CategoryItem}
              />
            ))}
          </div>

          {/* Product Cards */}
          <div className="flex flex-wrap -m-3 my-3 gap-5 justify-center">
            {products.length > 0 ? (
              products.map((item) => <Card item={item} key={item.id} />)
            ) : (
              <p>No products found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;