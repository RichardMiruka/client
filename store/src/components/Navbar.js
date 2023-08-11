import { Button, Navbar, Nav, Modal } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation ,Link} from 'react-router-dom';
import { CartContext } from '../CartContext';
import CartProduct from './CartProduct';
import jwtDecode from 'jwt-decode';

function NavbarComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const cart = useContext(CartContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [total, setTotal] = useState(null);
    const accessToken = localStorage.getItem('token');

    const decodedToken = accessToken ? jwtDecode(accessToken) : null;
    const usertype = decodedToken?.usertype;

    useEffect(() => {
        cart.getTotalCost().then(total => {
            setTotal(total);
        });
    }, [cart]);

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0);

    const handlePurchaseClick = () => {
        handleClose();
        navigate(`/mpesa?total=${total}`);
    };

    const showAddProductCartNavLinks = !['/', '/login', '/register', '/contact', '/faqs'].includes(location.pathname);
    const showContactAndFAQsNavLinks = ['/', '/login', '/register', '/contact', '/faqs', '/add-product', '/store'].includes(location.pathname);

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/">About Us</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        {showContactAndFAQsNavLinks && (
                            <>
                                <Link to="/contact" style={{ color: '#333', textDecoration: 'none', marginRight: '10px', fontWeight: 'bold' }}>Contact Us</Link>
                                <Link to="/faqs" style={{ color: '#333', textDecoration: 'none', marginRight: '10px', fontWeight: 'bold' }}>FAQs</Link>
                            </>
                        )}
                        {showAddProductCartNavLinks && (
                            <>
                                {usertype === 'farmer' && <Link to="/add-product" style={{ color: '#333', textDecoration: 'none', marginRight: '10px', fontWeight: 'bold' }}>Add Product</Link>}
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
                {showAddProductCartNavLinks && (
                    <Button onClick={handleShow} className="ml-auto">
                        Cart ({productsCount} Items)
                    </Button>
                )}
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {productsCount > 0 ? (
                        <>
                            <p>Items in your cart:</p>
                            {cart.items.map((currentProduct, idx) => (
                                <CartProduct key={idx} id={currentProduct.id} quantity={currentProduct.quantity}></CartProduct>
                            ))}
                            <h1>Total: Ksh {total}</h1>
                            <Button variant="success" onClick={handlePurchaseClick}>
                                Purchase items!
                            </Button>
                        </>
                    ) : (
                        <h1>There are no items in your cart!</h1>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default NavbarComponent;
