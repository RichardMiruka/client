import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cancel from './pages/Cancel';
import Store from './pages/Store';
import Success from './pages/Success';
import CartProvider from './CartContext';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Homepage from './pages/homepage';
import LipaNaMpesaComponent from './pages/LipaNaMpesaComponent';
import ContactUs from './pages/ContactUs';
import FAQS from './pages/FAQS';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './components/AddProduct';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Container>
          <NavbarComponent></NavbarComponent>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="store" element={<Store />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
            <Route path="mpesa" element={<LipaNaMpesaComponent />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="product/:id" element={<ProductDetail/>} />
            <Route path="faqs" element={<FAQS />} />
            <Route path="add-product" element={<AddProduct />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
