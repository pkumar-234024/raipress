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
    <Router basename="/">
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route
            exact
            path="/products/category/:categoryId"
            element={<ProductListing />}
          />
          <Route exact path="/product/:productId" element={<ProductDetail />} />
          <Route exact path="/admin" element={<AdminPanel />} />
          {/* Add other routes as needed */}
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
