import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Login from "./Auth/LoginModal";
import Signup from "./Auth/SignupModal";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPge";
import Header from "./components/Header";
import UseState from "./useState";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/useState" element={<UseState />} />

        {/* Auth Group */}
        <Route path="/auth">
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
        </Route>

        {/* <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} /> */}

        {/* products and cart */}
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
