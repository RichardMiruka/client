import React, { useState, useEffect } from 'react';
import {Row, Col} from 'react-bootstrap';
//import { productsArray } from '../productsStore';
import ProductCard from '../components/ProductCard';
function Store() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/products");
            const data = await response.json();
            setProducts(data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    return (
        <>
            <h1 align="center" className="p-3">Welcome to the Farmers</h1>
            <Row xs={1} md={3} className="g-4">
                {products.map((product, idx) => (
                    <Col align="center" key={idx}>
                        <ProductCard product={product}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export  default Store;