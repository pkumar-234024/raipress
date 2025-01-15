import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import CardCategory from './components/cardcategory/CardCategory';
import ImageView from './components/imageview/ImageView';
import Footer from './components/footer/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<CardCategory />} />
          <Route path="/image/:id" element={<ImageView />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
