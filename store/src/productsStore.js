
async function getProductData(id) {
    try {
        const response = await fetch(`http://localhost:5000/api/v1/products/${id}`);
        const data = await response.json();
        return data; // The response data already contains the required product information
    } catch (error) {
        console.error("Error fetching product data:", error);
        return undefined;
    }
}

export { getProductData };
