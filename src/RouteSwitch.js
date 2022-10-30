import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
import CategoryShop from "./Components/CategoryShop";

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="fish" element={<CategoryShop category="fish" 
                                                  last="8" />} />
        <Route path="bugs" element={<CategoryShop category="bugs" 
                                                  last="8" />} />
        <Route path="houseware" element={<CategoryShop category="houseware" 
                                                  last="58" />} />
        <Route path="songs" element={<CategoryShop category="songs" 
                                                  last="10" />} />
        <Route path="cart" exact element={<Cart />} />

      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;