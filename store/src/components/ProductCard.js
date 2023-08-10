import React from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { CartContext } from '../CartContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './productcard.css';

function ProductCard(props) {
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getProductQuantity(product.id);
  console.log(cart.items);
console.log(typeof product.avg_rating)
  return (
    <Card>
      <Card.Body>
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="card-img-top" />
        </Link>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Price: Ksh{product.price}</Card.Text>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Pickup Location: {product.location}</Card.Text>
        <Card.Text>
          {product.avg_rating !== null ? `Rating: ${product.avg_rating}` : 'Rating: 0'}
        </Card.Text>
        {productQuantity > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column="true" sm="6">
                In Cart: {productQuantity}
              </Form.Label>
              <Col sm="6">
                <Button sm="6" onClick={() => cart.addOneToCart(product.id)} className="mx-2">
                  +
                </Button>
                <Button sm="6" onClick={() => cart.removeOneFromCart(product.id)} className="mx-2">
                  -
                </Button>
              </Col>
            </Form>
            <Button variant="danger" onClick={() => cart.deleteFromCart(product.id)} className="my-2">
              Remove from cart
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={() => cart.addOneToCart(product.id)}>
            Add To Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
