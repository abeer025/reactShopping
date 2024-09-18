import { Link } from "react-router-dom";
import { Box,Button,Typography } from "@mui/material";

function Card({ item }) {
  const { thumbnail, Category, title, price, id } = item;


  return (
    <Link
      to={`/products/${id}`}
      className="lg:w-1/4 md:w-1/2 p-4 w-full shadow"
    >
      <Box>
        <div className="block relative h-48 rounded overflow-hidden">
          <img
            alt="ecommerce"
            className="object-cover object-center w-full h-full block"
            src={thumbnail}
          />
        </div>
        <div className="mt-4">
          <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
            {Category}
          </h3>
          <h2 className="text-gray-900 title-font text-lg font-medium">
            {title}
          </h2>
          <p className="mt-1">${price}</p>
        </div>
      </Box>
    </Link>
  );
}

export default Card;
