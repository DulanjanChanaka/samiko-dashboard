import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactUs from './components/ContactUs';
import CategoryItem from './components/CategoryItem';
import TopItemSwiper from './components/TopItemSwiper';
import Navbar from './components/Navbar';
function App() {
  return (
    <div >
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<ContactUs/>} />
      <Route path="/category" element={<CategoryItem/>} />
      <Route path="/topitem" element={<TopItemSwiper/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
