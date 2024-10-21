import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Badge } from "@mui/material";
import { CartContext } from "../context/CartContext";
import { IoMdSearch } from "react-icons/io";
import { FaShoppingCart, FaCaretDown, FaUserCircle } from "react-icons/fa";
import Logo from "../assets/logo.png";
import LoginModal from "../Auth/LoginModal";
import SignupModal from "../Auth/SignupModal";

// Dummy menu and dropdown items
const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Top Rated", link: "/#Services" },
  { id: 3, name: "Men's Wear", link: "/products" },
  { id: 4, name: "Women's Wear", link: "/products" },
  { id: 5, name: "Electronics", link: "/products" },
  { id: 6, name: "About Us", link: "/about" },
];

const DropDownLinks = [
  { id: 1, name: "Trending Products", link: "/#" },
  { id: 2, name: "Best Selling", link: "/products" },
  { id: 3, name: "Top Rated", link: "/products" },
];

const ProfileLinks = [
  { id: 1, name: "Profile", link: "/profile" },
  { id: 2, name: "Dashboard", link: "/dashboard" },
  { id: 3, name: "Login", link: "#" }, 
  { id: 4, name: "Signup", link: "#" }, 
];

function Header() {
  const { cartItems } = useContext(CartContext);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false); // State for Signup modal
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <>
      <header className="shadow-md bg-white dark:bg-grey-900 dark:text-white duration-200 relative z-40">
        {/* Upper Navbar */}
        <div className="bg-primary/40 py-2">
          <div className="container flex justify-between items-center mx-auto p-5">
            {/* Logo */}
            <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-3">
              <img src={Logo} alt="Logo" className="w-10" />
              reactShopping
            </Link>

            {/* Search bar */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] text-black transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary"
              />
              <IoMdSearch className="text-grey-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
            </div>

            {/* Shop Now Button */}
            <Button
              component={Link}
              to="/products"
              variant="contained"
              color="primary"
              className="my-8"
            >
              Shop Now
            </Button>

            {/* Cart Button */}
            <Link to="/cart">
              <Badge badgeContent={totalItems} color="secondary">
                <FaShoppingCart className="text-xl icon-lg cursor-pointer" />
              </Badge>
            </Link>
          </div>
        </div>

        {/* Lower Navbar */}
        <div className="bg-slate-400 text-white">
          <div className="container mx-auto flex justify-between items-center p-5">
            {/* Dropdown for Trending Products */}
            <div className="group relative cursor-pointer">
              <a href="#" className="flex items-center gap-[2px] py-2">
                Trending Products
                <FaCaretDown className="transition-all duration-200 mt-1 group-hover:rotate-180" />
              </a>
              <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md">
                <ul>
                  {DropDownLinks.map((data) => (
                    <li key={data.id}>
                      <Link
                        to={data.link}
                        className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                      >
                        {data.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <nav className="flex flex-wrap items-center text-base justify-center">
              {Menu.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  className="mr-5 hover:text-black"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Profile Dropdown for Dashboard, Login, Signup */}
            <div className="group relative cursor-pointer">
              <a href="#" className="flex items-center gap-[2px] py-2">
                <FaUserCircle className="text-xl" /> Profile
                <FaCaretDown className="transition-all duration-200 mt-1 group-hover:rotate-180" />
              </a>
              <div className="absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md">
                <ul>
                  {ProfileLinks.map((data) => (
                    <li key={data.id}>
                      {/* Open Login Modal on click */}
                      {data.name === "Login" ? (
                        <a
                          href="#"
                          onClick={openLoginModal}
                          className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                        >
                          {data.name}
                        </a>
                      ) : data.name === "Signup" ? (
                        <a
                          href="#"
                          onClick={openSignupModal}
                          className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                        >
                          {data.name}
                        </a>
                      ) : (
                        <Link
                          to={data.link}
                          className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                        >
                          {data.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Render the Login Modal */}
        {isLoginModalOpen && <LoginModal closeModal={closeLoginModal} />}
        {/* Render the Signup Modal */}
        {isSignupModalOpen && <SignupModal closeModal={closeSignupModal} />}
      </header>
    </>
  );
}

export default Header;
