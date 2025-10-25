'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
    id: number;
    product: string;
    size: string;
    format?: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (newItem: CartItem) => {
        setCartItems(prevItems => {
            // Normalize format for comparison - treat undefined and missing format as the same
            const normalizeFormat = (format: string | undefined) => format || null;
            
            const existingItem = prevItems.find(item => 
                item.id === newItem.id && 
                item.size === newItem.size && 
                normalizeFormat(item.format) === normalizeFormat(newItem.format)
            );

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === newItem.id && 
                    item.size === newItem.size && 
                    normalizeFormat(item.format) === normalizeFormat(newItem.format)
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                );
            } else {
                return [...prevItems, newItem];
            }
        });
        
        // Open cart when item is added
        setIsCartOpen(true);
    };

    const removeFromCart = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            isCartOpen,
            openCart,
            closeCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
} 