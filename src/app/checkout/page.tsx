'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import emailjs from '@emailjs/browser';

import "../../../node_modules/wowjs/css/libs/animate.css";
import NavbarTwo from "../../../components/navbarTwo";
import ScrollTop from "../../../components/scrollTop";
import CafeFooter from "../../../components/cafeFooter";
import { useCart } from "../context/CartContext";
import SlidingCart from "../components/SlidingCart";
import { useTranslations } from "../hooks/useTranslations";
import { EMAIL_CONFIG } from "../config/email";
import { addOrderToExcel } from "../utils/excelExport";

export default function Checkout() {
    const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, clearCart } = useCart();
    const translations = useTranslations();
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [customerInfo, setCustomerInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        country: 'Senegal'
    });

    const subtotal = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    const shipping = 0;; // 13% tax
    const total = subtotal + shipping - discount;

    const handlePromoCode = () => {
        if (promoCode.toLowerCase() === 'welcome10') {
            setDiscount(subtotal * 0.10); // 10% discount
        } else if (promoCode.toLowerCase() === 'freeship') {
            setDiscount(shipping);
        } else {
            setDiscount(0);
            alert('Invalid promo code');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerInfo({
            ...customerInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            // Configuration EmailJS
            const { SERVICE_ID, TEMPLATE_ID_CUSTOMER, TEMPLATE_ID_ADMIN, PUBLIC_KEY, ADMIN_EMAIL } = EMAIL_CONFIG;
            
            // Vérifier que la clé publique est configurée
            if (PUBLIC_KEY === 'your_public_key') {
                alert('Configuration EmailJS incomplète. Veuillez ajouter votre clé publique dans src/app/config/email.js');
                return;
            }
            
            // Vérifier que l'email du client est rempli
            if (!customerInfo.email || customerInfo.email.trim() === '') {
                alert('Veuillez remplir votre adresse email.');
                return;
            }
            
            // Vérifier que l'email admin est configuré
            if (!ADMIN_EMAIL || ADMIN_EMAIL.trim() === '') {
                alert('Configuration EmailJS incomplète. Veuillez configurer l\'email admin.');
                return;
            }
            
            // Préparer les données de la commande
            const orderData = {
                customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
                customer_email: customerInfo.email,
                customer_phone: customerInfo.phone,
                customer_address: customerInfo.address,
                customer_city: customerInfo.city,
                customer_country: customerInfo.country,
                order_total: total.toLocaleString('fr-FR', {maximumFractionDigits: 0}),
                order_items: cartItems.map(item => 
                    `${item.product} (${item.size}) - Quantité: ${item.quantity} - Prix: ${(item.price * item.quantity).toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA`
                ).join('\n'),
                order_date: new Date().toLocaleDateString('fr-FR'),
                order_id: `CMD-${Date.now()}`
            };

            console.log('Tentative d\'envoi d\'email avec les données:', {
                serviceId: SERVICE_ID,
                templateId: TEMPLATE_ID_CUSTOMER,
                publicKey: PUBLIC_KEY,
                orderData
            });

            // Email de confirmation au client
            const customerResult = await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID_CUSTOMER,
                {
                    to_email: customerInfo.email,
                    to_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
                    ...orderData
                },
                PUBLIC_KEY
            );

            console.log('Email client envoyé:', customerResult);

            // Email de notification à l'admin
            const adminResult = await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID_ADMIN,
                {
                    to_email: ADMIN_EMAIL,
                    admin_name: 'Herb & Bloom',
                    ...orderData
                },
                PUBLIC_KEY
            );

            console.log('Email admin envoyé:', adminResult);

            // Ajouter la commande au fichier Excel
            try {
                const excelResult = addOrderToExcel(orderData, cartItems);
                if (excelResult.success) {
                    console.log(`Commande ajoutée au fichier Excel: ${excelResult.fileName}`);
                    console.log(`Total des commandes: ${excelResult.totalOrders}`);
                } else {
                    console.error('Erreur lors de l\'ajout de la commande:', excelResult.error);
                }
            } catch (excelError) {
                console.error('Erreur lors de l\'ajout de la commande:', excelError);
            }


            // Vider le panier après envoi réussi
            clearCart();
            
            alert('Commande envoyée avec succès ! Vous recevrez un email de confirmation et la commande a été ajoutée au fichier Excel.');
            
        } catch (error) {
            console.error('Erreur détaillée lors de l\'envoi de l\'email:', error);
            console.error('Type d\'erreur:', typeof error);
            console.error('Message d\'erreur:', error.message);
            console.error('Code d\'erreur:', error.code);
            console.error('Stack trace:', error.stack);
            
            let errorMessage = 'Erreur lors de l\'envoi de la commande. ';
            
            if (error.message && error.message.includes('insufficient authentication scopes')) {
                errorMessage += 'Problème d\'autorisation Gmail. Veuillez reconfigurer votre service EmailJS avec les bonnes permissions.';
            } else if (error.message && error.message.includes('recipients address is empty')) {
                errorMessage += 'Adresse email du destinataire vide. Vérifiez votre configuration EmailJS et les variables dans vos templates.';
            } else if (error.message) {
                errorMessage += `Détails: ${error.message}`;
            } else if (error.text) {
                errorMessage += `Détails: ${error.text}`;
            } else {
                errorMessage += 'Veuillez vérifier votre configuration EmailJS.';
            }
            
            alert(errorMessage);
        }
    };

    return (
        <>
            <NavbarTwo navClass="defaultscroll sticky" manuClass="navigation-menu nav-right nav-light" navDark={false}/>
            <SlidingCart 
                isOpen={isCartOpen}
                onClose={closeCart}
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
            />
            
            {/* Breadcrumb */}
            <section className="section pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link href="/products">Products</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            {/* Checkout Content */}
            <section className="section">
                <div className="container">
                    <div className="row">
                        {/* Order Summary */}
                        <div className="col-lg-4 col-md-5">
                            <div className="card border-0 shadow">
                                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">{translations.order_summary}</h5>
                                    <button 
                                        className="btn btn-sm btn-outline-light" 
                                        onClick={() => {
                                            if (confirm('Are you sure you want to clear all items from your cart?')) {
                                                clearCart();
                                            }
                                        }}
                                        title="Clear Cart"
                                    >
                                        <i className="mdi mdi-delete-sweep"></i> {translations.clear_cart}
                                    </button>
                                </div>
                                <div className="card-body">
                                    {cartItems.map((item, index) => (
                                        <div key={index} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                                            <Image 
                                                src={item.image} 
                                                width={60} 
                                                height={60} 
                                                className="rounded me-3" 
                                                alt={item.product}
                                            />
                                            <div className="flex-grow-1">
                                                <h6 className="mb-1">{item.product}</h6>
                                                <p className="text-muted small mb-0">
                                                    {item.size}
                                                    {item.format && ` • ${item.format}`}
                                                </p>
                                                
                                                {/* Quantity Controls */}
                                                <div className="d-flex align-items-center mt-2">
                                                    <span className="text-muted small me-2">Qty:</span>
                                                    <div className="d-flex align-items-center border rounded">
                                                        <button 
                                                            className="btn btn-sm border-0 px-2" 
                                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-3 border-start border-end">{item.quantity}</span>
                                                        <button 
                                                            className="btn btn-sm border-0 px-2" 
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    
                                                    {/* Remove Button */}
                                                    <button 
                                                        className="btn btn-sm btn-outline-danger ms-2" 
                                                        onClick={() => removeFromCart(item.id)}
                                                        title="Remove item"
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

                                    {/* Promo Code */}
                                    <div className="mb-3">
                                        <div className="input-group">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Promo code"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                            />
                                            <button 
                                                className="btn btn-outline-primary" 
                                                type="button"
                                                onClick={handlePromoCode}
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    {/* Totals */}
                                    <div className="border-top pt-3">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>{translations.subtotal}</span>
                                            <span>{subtotal.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</span>
                                        </div>
                                        {/* <div className="d-flex justify-content-between mb-2">
                                            <span>Shipping:</span>
                                            <span>{shipping.toFixed(3)} FCFA</span>
                                        </div> */}
                                        
                                        {discount > 0 && (
                                            <div className="d-flex justify-content-between mb-2 text-success">
                                                <span>{translations.discount}</span>
                                                <span>-{discount.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</span>
                                            </div>
                                        )}
                                        <div className="d-flex justify-content-between fw-bold fs-5 border-top pt-2">
                                            <span>{translations.total}</span>
                                            <span>{total.toLocaleString('fr-FR', {maximumFractionDigits: 0})} FCFA</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customer Information Form */}
                        <div className="col-lg-8 col-md-7">
                            <div className="card border-0 shadow">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="mb-0">{translations.billing_details}</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="firstName" className="form-label">{translations.first_name} *</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="firstName"
                                                    name="firstName"
                                                    value={customerInfo.firstName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="lastName" className="form-label">{translations.last_name} *</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="lastName"
                                                    name="lastName"
                                                    value={customerInfo.lastName}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="email" className="form-label">{translations.email}</label>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    id="email"
                                                    name="email"
                                                    value={customerInfo.email}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="phone" className="form-label">{translations.phone} *</label>
                                                <input 
                                                    type="tel" 
                                                    className="form-control" 
                                                    id="phone"
                                                    name="phone"
                                                    value={customerInfo.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="address" className="form-label">{translations.address} *</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="address"
                                                name="address"
                                                value={customerInfo.address}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="city" className="form-label">{translations.city} *</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    id="city"
                                                    name="city"
                                                    value={customerInfo.city}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-3 mb-3">
                                                <label htmlFor="country" className="form-label">{translations.country}</label>
                                                <select 
                                                    className="form-select" 
                                                    id="country"
                                                    name="country"
                                                    value={customerInfo.country}
                                                    onChange={(e) => setCustomerInfo({...customerInfo, country: e.target.value})}
                                                >
                                                    <option value="Senegal">Sénégal</option>
                                                    <option value="Mali">Mali</option>
                                                    <option value="Burkina Faso">Burkina Faso</option>
                                                    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                                                    <option value="Guinée">Guinée</option>
                                                    <option value="Gambie">Gambie</option>
                                                    <option value="Guinée-Bissau">Guinée-Bissau</option>
                                                    <option value="Mauritanie">Mauritanie</option>
                                                    <option value="Niger">Niger</option>
                                                    <option value="Nigeria">Nigeria</option>
                                                    <option value="Tchad">Tchad</option>
                                                    <option value="Cameroun">Cameroun</option>
                                                    <option value="Gabon">Gabon</option>
                                                    <option value="Congo">Congo</option>
                                                    <option value="République Démocratique du Congo">République Démocratique du Congo</option>
                                                    <option value="Centrafrique">Centrafrique</option>
                                                    <option value="Togo">Togo</option>
                                                    <option value="Bénin">Bénin</option>
                                                    <option value="Ghana">Ghana</option>
                                                    <option value="Liberia">Liberia</option>
                                                    <option value="Sierra Leone">Sierra Leone</option>
                                                    <option value="Cap-Vert">Cap-Vert</option>
                                                    <option value="France">France</option>
                                                    <option value="Belgique">Belgique</option>
                                                    <option value="Suisse">Suisse</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="United States">United States</option>
                                                    <option value="United Kingdom">United Kingdom</option>
                                                    <option value="Allemagne">Allemagne</option>
                                                    <option value="Italie">Italie</option>
                                                    <option value="Espagne">Espagne</option>
                                                    <option value="Portugal">Portugal</option>
                                                    <option value="Pays-Bas">Pays-Bas</option>
                                                    <option value="Suède">Suède</option>
                                                    <option value="Norvège">Norvège</option>
                                                    <option value="Danemark">Danemark</option>
                                                    <option value="Finlande">Finlande</option>
                                                    <option value="Autriche">Autriche</option>
                                                    <option value="Maroc">Maroc</option>
                                                    <option value="Algérie">Algérie</option>
                                                    <option value="Tunisie">Tunisie</option>
                                                    <option value="Égypte">Égypte</option>
                                                    <option value="Libye">Libye</option>
                                                    <option value="Soudan">Soudan</option>
                                                    <option value="Éthiopie">Éthiopie</option>
                                                    <option value="Kenya">Kenya</option>
                                                    <option value="Tanzanie">Tanzanie</option>
                                                    <option value="Ouganda">Ouganda</option>
                                                    <option value="Rwanda">Rwanda</option>
                                                    <option value="Burundi">Burundi</option>
                                                    <option value="Madagascar">Madagascar</option>
                                                    <option value="Maurice">Maurice</option>
                                                    <option value="Seychelles">Seychelles</option>
                                                    <option value="Comores">Comores</option>
                                                    <option value="Djibouti">Djibouti</option>
                                                    <option value="Somalie">Somalie</option>
                                                    <option value="Erythrée">Erythrée</option>
                                                    <option value="Afrique du Sud">Afrique du Sud</option>
                                                    <option value="Zimbabwe">Zimbabwe</option>
                                                    <option value="Zambie">Zambie</option>
                                                    <option value="Botswana">Botswana</option>
                                                    <option value="Namibie">Namibie</option>
                                                    <option value="Angola">Angola</option>
                                                    <option value="Mozambique">Mozambique</option>
                                                    <option value="Malawi">Malawi</option>
                                                    <option value="Zambie">Zambie</option>
                                                    <option value="Lesotho">Lesotho</option>
                                                    <option value="Swaziland">Swaziland</option>
                                                    <option value="Autre">Autre</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <Link href="/products" className="btn btn-outline-secondary me-md-2">
                                                {translations.continue_shopping}
                                            </Link>
                                            <button type="submit" className="btn btn-primary">
                                                {translations.place_order}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CafeFooter/>
            <ScrollTop/>
        </>
    );
} 