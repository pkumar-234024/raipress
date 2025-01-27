import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ProductListing from "./components/productlisting/ProductListing";
import Home from "./components/home/Home";
import ProductDetail from "./components/productdetail/ProductDetail";
import AdminPanel from "./components/admin/AdminPanel";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route
            path="/products/category/:categoryId"
            element={<ProductListing />}
          />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
