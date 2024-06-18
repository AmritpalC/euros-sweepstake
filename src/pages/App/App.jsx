import './App.css';
import { Route, Routes } from 'react-router-dom';

import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import GeneratorPage from '../GeneratorPage/GeneratorPage';
import Footer from '../../components/Footer/Footer';

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
