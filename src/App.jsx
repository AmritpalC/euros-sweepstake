import './App.css';
import { Route, Routes } from 'react-router-dom';

import NavBar from './NavBar';
import HomePage from './HomePage';
import GeneratorPage from './GeneratorPage';
import Footer from './Footer';

export default function App() {

  return (
    <main className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
    </main>
  );
}
