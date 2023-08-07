import Button from 'react-bootstrap/Button';
import { CartContext } from "../CartContext";
import { useContext, useEffect, useState } from "react";
import { getProductData } from "../productsStore";

function CartProduct(props) {
    const cart = useContext(CartContext);
    const id = props.id;
    const quantity = props.quantity;
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        // Fetch the product data when the component mounts
        const fetchData = async () => {
            const data = await getProductData(id);
            setProductData(data);
        };
        fetchData();
    }, [id]);

    if (!productData) {
        // Product data is not available yet, display a loading message or return null
        return <p>Loading...</p>;
    }

    return (
        <>
            <h3>{productData.title}</h3>
            <p>Quantity: {quantity}</p>
            <p>Price Ksh: {productData.price}</p>
            <p>Total: Ksh: {(quantity * productData.price).toFixed(2)}</p>
            <Button size="sm" onClick={() => cart.deleteFromCart(id)}>Remove</Button>
            <hr></hr>
        </>
    )
}

export default CartProduct;
