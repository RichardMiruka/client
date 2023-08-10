
async function getProductData(id) {
    try {
        const response = await fetch(`https://ecogreen.onrender.com/api/v1/products/${id}`);
        const data = await response.json();
        console.log(data)
        return data; // The response data already contains the required product information
    } catch (error) {
        console.error("Error fetching product data:", error);
        return undefined;
    }
}

export { getProductData };
