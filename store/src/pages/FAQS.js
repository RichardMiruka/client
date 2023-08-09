import React ,{ useState } from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import './FAQS.css';

const FAQS = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqData = [
        {
            question: 'How do I create an account on the e-commerce platform?',
            answer: [
                'To create an account, click on the "Sign Up" button at the top of the page.',
                'Fill in your details such as name, email, and password, and then click "Register."'
            ]
        },
        {
            question: 'Can I track the status of my order?',
            answer: ['Yes, you can track your order by logging into your account and navigating to the "Order Tracking" section.']
        },
        {
            question: 'What payment methods are accepted?',
            answer: ['We accept various payment methods, including MPESA,credit/debit cards, PayPal, and online banking.']
        },
        {
            question: 'How long does shipping take?',
            answer: [
                'Shipping times vary depending on your location and the chosen shipping option.',
                'On average, orders are delivered within 5-7 business days.'
            ]
        },
        {
            question: 'What is the return policy?',
            answer: [
                'Our return policy allows for returns within 30 days of the purchase date.',
                'Items must be unused and in their original packaging. Please refer to our "Returns and Refunds" page for more details.'
            ]
        },
        {
            question: 'Do you offer international shipping?',
            answer: [
                'Yes, we offer international shipping to many countries.',
                'Shipping rates and times vary depending on the destination. You can find more information during the checkout process.'
            ]
        },
        {
            question: 'How can I contact customer support?',
            answer: [
                'You can reach our customer support team via email at support@ecogreen.test.com.',
                'Additionally, you can use the live chat feature on our website for immediate assistance.'
            ]
        },
        {
            question: 'Are my payment details secure?',
            answer: ['Yes, we take the security of your payment information seriously. We use advanced encryption technology to protect your data.']
        },
        {
            question: 'Can I change or cancel my order after it has been placed?',
            answer: [
                'Changes or cancellations to orders can be made within 24 hours of placing the order.',
                'Please contact our customer support team as soon as possible to request changes.'
            ]
        },
        {
            question: 'Do you offer gift wrapping services?',
            answer: ['Yes, we offer gift wrapping services for an additional fee. You can select this option during the checkout process.']
        },

    ];

    const toggleFAQ = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <div className="faqs-container">
            <h2>Frequently Asked Questions</h2>
            <div className="questions-container">
                {faqData.map((faq, index) => (
                    <div className="content-container" key={index}>
                        <div className="faq-header" onClick={() => toggleFAQ(index)}>
                            <h3>{faq.question}</h3>
                            <span className={`open ${activeIndex === index ? 'active' : ''}`}>-</span>
                            <span className={`close ${activeIndex !== index ? 'active' : ''}`}>+</span>
                        </div>
                        <div className={`content ${activeIndex === index ? 'active' : ''}`}>
                            {faq.answer.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQS;
