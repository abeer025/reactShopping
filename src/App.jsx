import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Product/:id" element={<ProductDetail />} />
          <Route path="/Products" element={<Products />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter>
  );
}

export default App;