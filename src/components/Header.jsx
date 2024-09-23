import { Link } from "react-router-dom";
import { useContext } from "react";
import { Button, Badge, IconButton } from "@mui/material";
import Icon from "@mdi/react";
import { mdiCart } from "@mdi/js";
import { CartContext } from "../context/CartContext";

function Header() {
  const { cartItems } = useContext(CartContext);
  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  console.log(totalItems);
  return (
    <header className="text-white text-ellipsis body-font bg-slate-400">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-xl">reactShopping</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center ">
          <Link to="/" className="mr-5 hover:text-black">
            Home
          </Link>
          <Link to="/about" className="mr-5 hover:text-black">
            About
          </Link>
          <Link to="/login" className="mr-5 hover:text-black">
            Login
          </Link>
          <Link to="/signup" className="mr-5 hover:text-black">
            Signup
          </Link>
        </nav>
        <Button
          component={Link}
          to="/products"
          variant="contained"
          color="primary"
          className="my-8"
        >
          Shop Now
        </Button>
        <Link to="/cart">
          <IconButton color="primary" aria-label="cart">
            <Badge badgeContent={totalItems} color="secondary">
              <Icon path={mdiCart} size={1} color="white" />
            </Badge>
          </IconButton>
        </Link>
      </div>
    </header>
  );
}

export default Header;
