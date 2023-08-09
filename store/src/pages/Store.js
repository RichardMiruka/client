import React, { useState, useEffect } from 'react';
import { Row, Col} from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import jwtDecode from 'jwt-decode';
import './Store.css';
function Store() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const accessToken = localStorage.getItem('token');

  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.user_id;
  console.log(userId)

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/products",{
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    });
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1 align="center" className="p-3">Welcome to the Farmers</h1>
      <div className='search-bar'>
        <input
          className='form-control'
          type="text"
          placeholder="Search by product name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    
      <Row xs={1} md={3} className="g-4">
        {filteredProducts.map((product, idx) => (
          <Col align="center" key={idx}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
