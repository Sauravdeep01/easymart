import React, { createContext, useState, useEffect } from 'react';
import { featuredProducts } from '../constants';
import extendedProducts from '../expandedProducts.json';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const [cartItems, setCartItems] = useState({});
    const [wishlistItems, setWishlistItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const login = async (email, password) => {
        try {
            const response = await fetch(`${backendUrl}/api/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                setUserData(data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('userData', JSON.stringify(data));
                return { success: true, data };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Login Error:", error);
            return { success: false, message: "Server connection failed" };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch(`${backendUrl}/api/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                setUserData(data);
                localStorage.setItem('token', data.token);
                localStorage.setItem('userData', JSON.stringify(data));
                return { success: true, data };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Register Error:", error);
            return { success: false, message: "Server connection failed" };
        }
    };

    const logout = () => {
        setToken('');
        setUserData(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
    };

    const updateUserProfile = async (updatedData) => {
        try {
            const response = await fetch(`${backendUrl}/api/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });
            const data = await response.json();
            if (response.ok) {
                setUserData(data);
                localStorage.setItem('userData', JSON.stringify(data));
                return { success: true, data };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Update Profile Error:", error);
            return { success: false, message: "Server connection failed" };
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/products`);
                const data = await response.json();
                if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    // Fallback to local data if DB is empty
                    setProducts(extendedProducts);
                }
            } catch (error) {
                console.error("Failed to fetch products from backend:", error);
                setProducts(extendedProducts);
            }
        };
        fetchProducts();
    }, []);

    // Helper to persist products to Database
    const addCustomProduct = async (newProduct) => {
        try {
            const response = await fetch(`${backendUrl}/api/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newProduct)
            });
            const data = await response.json();
            setProducts([data, ...products]);
        } catch (error) {
            console.error("Failed to add product to backend:", error);
            setProducts([newProduct, ...products]);
        }
    };

    const updateProduct = async (id, updatedData) => {
        try {
            const response = await fetch(`${backendUrl}/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });
            const data = await response.json();
            setProducts(prev => prev.map(p => p.id === id ? data : p));
        } catch (error) {
            console.error("Failed to update product:", error);
            setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
        }
    };

    const removeProduct = async (id) => {
        try {
            await fetch(`${backendUrl}/api/products/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error("Failed to remove product:", error);
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    };

    const addToCart = async (itemId, size) => {
        if (!size) {
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    };

    const toggleWishlist = (itemId) => {
        if (wishlistItems.includes(itemId)) {
            setWishlistItems(prev => prev.filter(item => item !== itemId));
        } else {
            setWishlistItems(prev => [...prev, itemId]);
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product.id === items || product.id === parseInt(items));
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0 && itemInfo) {
                        // Handle price string like "$123"
                        const price = parseFloat(itemInfo.price.replace(/[^0-9.]/g, ''));
                        totalAmount += price * cartItems[items][item];
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return totalAmount;
    };

    const value = {
        products,
        setProducts,
        addCustomProduct,
        updateProduct,
        removeProduct,
        currency,
        delivery_fee,
        cartItems,
        wishlistItems,
        addToCart,
        toggleWishlist,
        getCartCount,
        updateQuantity,
        getCartAmount,
        token,
        userData,
        login,
        register,
        logout,
        updateUserProfile
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
