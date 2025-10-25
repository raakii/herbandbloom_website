'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "../hooks/useTranslations";

interface CartItem {
    id: number;
    product: string;
    size: string;
    format?: string;
    price: number;
    quantity: number;
    image: string;
}

interface SlidingCartProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemoveItem: (id: number) => void;
    onClearCart?: () => void;
}

export default function SlidingCart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }: SlidingCartProps) {
    const translations = useTranslations();
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    className="cart-overlay position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
                    style={{ zIndex: 1040 }}
                    onClick={onClose}
                ></div>
            )}

            {/* Sliding Cart */}
            <div 
                className={`cart-sidebar position-fixed top-0 end-0 h-100 bg-white shadow-lg`}
                style={{ 
                    width: '400px', 
                    zIndex: 1050,
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.3s ease-in-out'
                }}
            >
                {/* Cart Header */}
                <div className="cart-header d-flex justify-content-between align-items-center p-3 border-bottom">
                    <h5 className="mb-0">{translations.shopping_cart}</h5>
                    <button 
                        className="btn btn-link text-dark p-0"
                        onClick={onClose}
                    >
                        <i className="mdi mdi-close fs-4"></i>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="cart-items flex-grow-1 overflow-auto" style={{ height: 'calc(100vh - 250px)' }}>
                    {cartItems.length === 0 ? (
                        <div className="text-center p-4">
                            <i className="mdi mdi-cart-outline fs-1 text-muted"></i>
                            <p className="mt-3 text-muted">{translations.your_cart_empty}</p>
                            <Link href="/products" className="btn btn-primary" onClick={onClose}>
                                {translations.start_shopping}
                            </Link>
                        </div>
                    ) : (
                        <div className="p-3">
                            {cartItems.map((item, index) => (
                                <div key={index} className="cart-item d-flex align-items-center mb-3 pb-3 border-bottom">
                                    <Image 
                                        src={item.image} 
                                        width={60} 
                                        height={60} 
                                        className="rounded me-3" 
                                        alt={item.product}
                                    />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">{item.product}</h6>
                                        <p className="text-muted small mb-1">
                                            {item.size}
                                            {item.format && ` • ${item.format}`}
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <div className="quantity-controls d-flex align-items-center border rounded me-2">
                                                <button 
                                                    className="btn btn-sm border-0 px-2"
                                                    onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                >
                                                    -
                                                </button>
                                                <span className="px-2">{item.quantity}</span>
                                                <button 
                                                    className="btn btn-sm border-0 px-2"
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button 
                                                className="btn btn-link text-danger p-0"
                                                onClick={() => onRemoveItem(item.id)}
                                            >
                                                <i className="mdi mdi-delete"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h6 className="mb-0">{(item.price * item.quantity).toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</h6>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cart Footer */}
                {cartItems.length > 0 && (
                    <div className="cart-footer border-top p-3">
                        <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold">{translations.subtotal}</span>
                            <span className="fw-bold">{subtotal.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</span>
                        </div>
                        <div className="d-grid gap-2">
                            <Link 
                                href="/checkout" 
                                className="btn btn-primary"
                                onClick={onClose}
                            >
                                {translations.proceed_checkout}
                            </Link>
                            <div className="d-flex gap-2">
                                <button 
                                    className="btn btn-outline-secondary flex-fill"
                                    onClick={onClose}
                                >
                                    {translations.continue_shopping}
                                </button>
                                {onClearCart && (
                                    <button 
                                        className="btn btn-outline-danger"
                                        onClick={onClearCart}
                                    >
                                        {translations.clear_cart}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
} 