import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ContactUs.css';

function ContactUs() {
    return (
        <Container className="contact-us-container">
            <h2 className="contact-us-heading">Contact Us</h2>
            <Row>
                <Col>
                    <div className="contact-info">
                        <p>If you have any questions or inquiries, please feel free to contact us using the information below:</p>
                        <address>
                            <strong>Email:</strong> ecogreen@example.com<br />
                            <strong>Phone:</strong> +254 456-7890<br />
                            <strong>Address:</strong> 123 Westlands, Nairobi, Kenya<br />
                        </address>
                        <div className="office-hours">
                        <h4>Office Hours</h4>
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                    </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
    );
}

export default ContactUs;
