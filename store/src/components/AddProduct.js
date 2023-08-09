import React, { useState } from 'react';

function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleAddProduct = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('location', location);
        formData.append('quantity', quantity);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch("http://localhost:5000/api/v1/products/create", {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                console.log('Product added successfully');
                // Reset the form fields after successful submission
                setName('');
                setPrice('');
                setDescription('');
                setLocation('');
                setQuantity('');
                setImage(null);
            } else {
                console.error('Error adding product');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Add Product</h2>
            <form>

            <input type="text" className='form-control' placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <div>
                <input type="number" className='form-control' placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />

            </div>
            <div>
                <input type="text" className='form-control' placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

            </div>
            <div>
                <input type="text" className='form-control' placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

            </div>
            <div>
                <input type="number" className='form-control' placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

            </div>
            <div>
                <input type="file" className='form-control' accept="image/*" onChange={handleImageChange} />
            </div>

            <div className='btn btn-primary'><button onClick={handleAddProduct}>Add Product</button></div>
            </form>
        </div>
        
    );
}

export default AddProduct;
