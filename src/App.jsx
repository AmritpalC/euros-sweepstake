import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import NavBar from './NavBar';
import HomePage from './HomePage'
import Footer from './Footer'

export default function App() {

  return (
    <main className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </main>
  );
}
