import { createContext, useState } from "react";
import { getProductData } from "./productsStore"; // Import getProductData from the productsStore file

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    // [ { id: 1 , name: 'Product Name', price: 10.0, quantity: 3 }, { id: 2, name: 'Another Product', price: 20.0, quantity: 1 } ]

    function getProductQuantity(id) {
        const quantity = cartProducts.find((product) => product.id === id)?.quantity;
        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 0) {
            // product is not in cart
            const productData = getProductData(id);
            console.log("Product Data:", productData);
            if (productData) {
                setCartProducts([
                    ...cartProducts,
                    {
                        id: id,
                        name: productData.name,
                        price: productData.price,
                        quantity: 1,
                    },
                ]);
            }
        } else {
            // product is in cart
            setCartProducts(
                cartProducts.map((product) =>
                    product.id === id
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                )
            );
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map((product) =>
                    product.id === id
                        ? { ...product, quantity: product.quantity - 1 }
                        : product
                )
            );
        }
    }

    function deleteFromCart(id) {
        setCartProducts(
            cartProducts.filter((currentProduct) => currentProduct.id !== id)
        );
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.forEach((cartItem) => {
            const productData = getProductData(cartItem.id);
            if (productData) {
                console.log("productData "+productData);
                console.log("price"+cartItem.id)
                totalCost += productData.price * cartItem.quantity;
            }
        });
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
