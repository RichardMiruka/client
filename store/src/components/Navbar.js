import { Button, Navbar, Nav, Modal } from 'react-bootstrap';
import { useState,useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CartContext } from "../CartContext";
import CartProduct from './CartProduct';

function NavbarComponent() {
    const navigate = useNavigate(); // Initialize useNavigate
    const cart = useContext(CartContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [total, setTotal] = useState(null);

    useEffect(() => {
        cart.getTotalCost().then(total => {
            setTotal(total); // Store the resolved total in state
        });
    }, [cart]);
    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);
   
    const handlePurchaseClick = () => {
        handleClose(); // Close the modal
        navigate(`/mpesa?total=${total}`);// Redirect to LipaNaMpesaComponent
    };

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/">About Us</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link href="/contact">Contact Us</Nav.Link>
                        <Nav.Link href="/faqs">FAQs</Nav.Link>
                        <Nav.Link href="/add-product">Add Product</Nav.Link> 
                    </Nav>
                </Navbar.Collapse>
                <Button onClick={handleShow} className="ml-auto">Cart ({productsCount} Items)</Button>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ?
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map((currentProduct, idx) => (
                                <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                            ))}
                             
                            <h1>Total:Ksh  {total}</h1>

                            <Button variant="success" onClick={handlePurchaseClick}>
                                Purchase items!
                            </Button>
                        </>
                        :
                        <h1>There are no items in your cart!</h1>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}

export default NavbarComponent;
