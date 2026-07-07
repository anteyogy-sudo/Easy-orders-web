import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import Catalog from './Pages/Catalog';
import Cart from './Pages/Cart';
import Orders from './Pages/Orders';
import Profile from './Pages/Profile';
import Auth from './Pages/Auth';

import './App.css'

function App() {

   return (
    <BrowserRouter>
      <Header />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
  
}

export default App
