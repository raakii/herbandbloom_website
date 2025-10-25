'use client'
import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartButton() {
    const { cartCount, openCart } = useCart();

    return (
        <button 
            className="btn btn-outline-light position-relative"
            onClick={openCart}
            style={{ 
                zIndex: 1030, 
                marginTop: '8px',
                color: 'white',
                borderColor: 'white',
                backgroundColor: 'transparent'
            }}
        >
            <i className="mdi mdi-cart fs-5"></i>
            {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount > 99 ? '99+' : cartCount}
                </span>
            )}
        </button>
    );
} 