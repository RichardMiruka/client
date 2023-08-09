// CartProduct.js

import React, { useContext, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { CartContext } from "../CartContext";
import { getProductData } from "../productsStore";

function CartProduct(props) {
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProductData(id);
            setProductData(data);
        };
        fetchData();
    }, [id]);

    if (!productData) {
        return <p>Loading...</p>;
    }

    return (
        
        <div>
            <table className="table">
            <tr>
            <td>{productData.id}</td>
            <td>{productData.name}</td>
            <td>{quantity} X {productData.price}</td>
            <td>Total: Ksh {(quantity * productData.price).toFixed(2)}</td>
            <td><Button size="sm" className="btn btn-warning" onClick={() => cart.deleteFromCart(id)}>Remove</Button></td>
        </tr>
            </table>
            
        </div>
       
        
        
    );
}

export default CartProduct;
