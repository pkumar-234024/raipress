import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import ProductListing from "./components/productlisting/ProductListing";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<ProductListing />} />
          {/* Add other routes as needed */}
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
