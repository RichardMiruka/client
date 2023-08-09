import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductData } from "../productsStore";
import './ProductDetails.css'; 
import { Card, Button, Modal, Form } from 'react-bootstrap';

function ProductDetail() {
  const { id } = useParams(); // Get the id parameter from the route
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(1);
  const [comments, setComments] = useState('');

  useEffect(() => {
    async function fetchData() {
      const productData = await getProductData(id);
      console.log("Dattattt"+productData)
      setProduct(productData);
    }
    fetchData();
  }, [id]);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleReviewSubmit = async () => {
    try {
      const requestData = {
        product_id: product.id,
        user_id: 1, // Replace with the actual user ID
        comment: comments,
        rating: parseInt(rating),
      };
  
      const response = await fetch('http://localhost:5000/api/v1/Reviews/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        // Review successfully submitted
        // You can handle any further logic or state updates here
        console.log('Review submitted successfully');
        setShowModal(false); // Close the modal
      } else {
        // Handle error scenario
        console.error('Error submitting review');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Card className="product-card">
      <Link to={`/product/${product.id}`}>
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>Price: Ksh {product.price}</Card.Text>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>Pickup Location: {product.location}</Card.Text>
        <Card.Text>In stock: {product.quantity}</Card.Text>
        <Button variant="primary" onClick={() => setShowModal(true)}>Give Review</Button>
      </Card.Body>

      {/* Review Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Comments</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
          <Button variant="primary" onClick={handleReviewSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default ProductDetail;
