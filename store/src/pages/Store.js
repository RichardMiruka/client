import React, { useState, useEffect } from 'react';
import {Row, Col} from 'react-bootstrap';
//import { productsArray } from '../productsStore';
import ProductCard from '../components/ProductCard';
function Store() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch('http://localhost:5000/api/v1/products')
        .then(res => res.json())
        .then(prod => setProducts(prod.data))
        .catch(error => console.error(error));
    }, []);

    function getProductData(id) {
        let productData = products.find(product => product.id === id);
    
        if (productData == undefined) {
            console.log("Product data does not exist for ID: " + id);
            return undefined;
        }
    
        return productData;
    }
    return (
        <>
            <h1 align="center" className="p-3">Welcome to the store!</h1>
            <Row xs={1} md={3} className="g-4">
                {products.map((product, idx) => (
                    <Col align="center" key={idx}>
                        <ProductCard product={product} data={getProductData(product.id)}/>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export  default Store;