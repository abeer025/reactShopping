import axios from "axios";
import { useEffect, useState } from "react";
import Category from "../components/Category";
import Card from "../components/Card.jsx";
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
      url = `https://dummyjson.com/products/search?q=${searchQuery}&sortBy=${sortBy}&order=${order}`;
    } else {
      url =
        chosenCategory === "All"
          ? `https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`
          : `https://dummyjson.com/products/Category/${chosenCategory}?sortBy=${sortBy}&order=${order}`;
    }

    // Fetch products based on Category, search query, sorting, and ordering
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
  }, [chosenCategory, searchQuery, sortBy, order]);

  // Fetch product categories
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
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
    // Trigger fetching the products with the updated search query and Category
    console.log(
      "Search triggered with:",
      searchQuery,
      "Category:",
      chosenCategory,
      "Sort:",
      sortBy,
      "Order:",
      order
    );
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
                <MenuItem value={CategoryItem.slug} key={CategoryItem.slug}>
                  {CategoryItem.name}
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
          <div className="flex gap-3 flex-wrap">
            <Category
              onClick={() => setChosenCategory("All")}
              isChosen={chosenCategory === "All"}
              Category={{ slug: "All", name: "All" }}
              key="All"
            />
            {categories.map((CategoryItem) => (
              <Category
                onClick={() => setChosenCategory(CategoryItem.slug)}
                isChosen={CategoryItem.slug === chosenCategory}
                Category={CategoryItem}
                key={CategoryItem.slug}
              />
            ))}
          </div>

          {/* Product Cards */}
          <div className="flex flex-wrap -m-4 my-4">
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
