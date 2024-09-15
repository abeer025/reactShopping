import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Category from "../components/Category";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chosenCategory, setChosenCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let url = "";
    if (searchQuery) {
      url = `https://dummyjson.com/products/search?q=phone`;
    } else {
      url =
        chosenCategory === "All"
          ? "https://dummyjson.com/products"
          : `https://dummyjson.com/products/category/${chosenCategory}`;
    }

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
  }, [chosenCategory, searchQuery]);

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto">
      {loading ? (
        <h1 className="text-center text-3xl">Loading....</h1>
      ) : (
        <>
          <div className="flex justify-center w-1/2 mb-4">
            <input
              type="search"
              placeholder="Search Products..."
              className="p-2 border border-gray-300 rounded"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <Category
              onClick={() => setChosenCategory("All")}
              isChosen={chosenCategory === "All"}
              category={{ slug: "All", name: "All" }}
              key="all" // Unique key
            />
            {categories.map((categoryItem) => (
              <Category
                onClick={() => setChosenCategory(categoryItem.slug)}
                isChosen={categoryItem.slug === chosenCategory}
                category={categoryItem}
                key={categoryItem.slug} // Ensure unique key
              />
            ))}
          </div>

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
