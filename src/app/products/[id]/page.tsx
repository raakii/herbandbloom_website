'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

import "wowjs/css/libs/animate.css";
import NavbarTwo from "../../../../components/navbarTwo";
import ScrollTop from "../../../../components/scrollTop";
import CafeFooter from "../../../../components/cafeFooter";
import { useCart } from "../../context/CartContext";
import SlidingCart from "../../components/SlidingCart";
import WhatsAppButton from "../../components/WhatsAppButton";

import { useTranslations } from "@/app/hooks/useTranslations";
import { useLanguage } from "@/app/context/LanguageContext";

// Product data - you can move this to a separate file later

// Product data will be defined inside the component to use translations

export default function ProductDetail() {
    const params = useParams();
    const productId = parseInt(params.id as string);
    const [quantity, setQuantity] = React.useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedFormat, setSelectedFormat] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const { addToCart, cartItems, isCartOpen, openCart, closeCart, updateQuantity, removeFromCart, cartCount } = useCart();
    const translations = useTranslations();
    const { language } = useLanguage();
    const { product_details } = translations;
    
    const productData = [
        {
            id: 1,
            image1: '/images/IMG2.JPG',
            image2: '/images/IMG_2576.jpg',
            tag: 'Featured',
            tagClass: 'text-bg-success',
            product: language === 'en' ? translations.bloom_grow_hair_oil : translations.bloom_grow_hair_oil,
            amount: '10 000 Fcfa',
            description: 'Nourishing hair oil made with natural ingredients to promote healthy hair growth and shine. Perfect for all hair types.',
            sizes: ['50ml'],
            colors: ['Natural'],
            inStock: true,
            rating: 4.8,
            reviews: 42
        },
        {
            id: 2,
            image1: '/images/IMG_5474.JPG',
            image2: '/images/IMG_5454.JPG',
            tag: 'New',
            tagClass: 'text-bg-primary',
            product: language === 'en' ? translations.bloom_butter_hair_cream : translations.bloom_butter_hair_cream,
            amount: '5 000 Fcfa',
            description: 'Hydrating hair cream that moisturizes and defines curls while providing long-lasting hold. Ideal for curly and wavy hair.',
            sizes: ['150ml'],
            colors: ['Natural'],
            inStock: true,
            rating: 4.5,
            reviews: 8
        },
        {
            id: 4,
            image1: '/images/henné.png',
            image2: '/images/henné2.png',
            tag: 'New',
            tagClass: 'text-bg-primary',
            product: language === 'en' ? translations.henna_powder : translations.henna_powder,
            amount: '2 000 Fcfa',
            description: 'Henna powder, great for hand decoration, face or hair masks',
            sizes: ['150g'],
            colors: ['Natural'],
            inStock: true,
            rating: 4.0,
            reviews: 5
        }
    ];
    // Find the product by ID
    const product = productData.find(p => p.id === productId);
    const product_detail = product_details.find((p: { id: number; }) => p.id === productId);
    const size = language === "en" ? "Size" : "Contenance";

    useEffect(() => {
        document.body.classList.add('restaurant-css');
        import('wowjs').then((WOW) => {
        });
        
        // Set default format for deodorant
        if (product && product.id === 3 && !selectedFormat) {
            setSelectedFormat('Roll-on');
        }
        
        // Set default image
        if (product && !selectedImage) {
            setSelectedImage(product.image1);
        }
    }, [product, selectedFormat, selectedImage]);

    if (!product) {
        return (
            <>
                <NavbarTwo navClass="defaultscroll sticky" manuClass="navigation-menu nav-right nav-light" navDark={false}/>
                <section className="section pt-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h2>Product Not Found</h2>
                                <p>The product you're looking for doesn't exist.</p>
                                <Link href="/products" className="btn btn-primary">Back to Products</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <CafeFooter/>
                <ScrollTop/>
            </>
        );
    }

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
            
            {/* Floating Cart Button */}
            <div 
                className="position-fixed" 
                style={{
                    top: '20px',
                    right: '20px',
                    zIndex: 1050,
                    cursor: 'pointer'
                }}
            >
                <button 
                    className="btn btn-primary rounded-circle shadow-lg"
                    onClick={openCart}
                    style={{
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}
                    title={language === 'en' ? translations.view_cart : translations.view_cart}
                >
                    <i className="mdi mdi-cart fs-4 text-white"></i>
                    {cartCount > 0 && (
                        <span 
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            style={{fontSize: '0.75rem'}}
                        >
                            {cartCount > 99 ? '99+' : cartCount}
                        </span>
                    )}
                </button>
            </div>
            
            {/* Breadcrumb */}
            <section className="section pt-5" style={{marginTop: '100px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link href="/products">Products</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{product.product}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Detail */}
            <section className="section" style={{marginTop: '-150px'}}>
                <div className="container">
                    <div className="row">
                        {/* Product Images */}
                        <div className="col-lg-6 col-md-6">
                            <div className="product-images">
                                <div className="main-image mb-3">
                                    <Image 
                                        src={selectedImage || product.image1} 
                                        width={500} 
                                        height={500} 
                                        className="img-fluid rounded" 
                                        alt={product.product}
                                    />
                                </div>
                                <div className="thumbnail-images d-flex gap-2">
                                    <div 
                                        className={`cursor-pointer ${selectedImage === product.image1 ? 'border border-primary border-3' : 'border'}`}
                                        onClick={() => setSelectedImage(product.image1)}
                                        style={{ borderRadius: '8px', overflow: 'hidden' }}
                                    >
                                        <Image 
                                            src={product.image1} 
                                            width={100} 
                                            height={100} 
                                            className="img-fluid" 
                                            alt={product.product}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div 
                                        className={`cursor-pointer ${selectedImage === product.image2 ? 'border border-primary border-3' : 'border'}`}
                                        onClick={() => setSelectedImage(product.image2)}
                                        style={{ borderRadius: '8px', overflow: 'hidden' }}
                                    >
                                        <Image 
                                            src={product.image2} 
                                            width={100} 
                                            height={100} 
                                            className="img-fluid" 
                                            alt={product.product}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="col-lg-6 col-md-6">
                            <div className="product-info">
                                {product.tag && (
                                    <span className={`badge ${product.tagClass} mb-2`}>{product.tag}</span>
                                )}
                                
                                <h2 className="mb-3">{product.product}</h2>
                                
                                <div className="rating mb-3">
                                    <span className="text-warning">
                                        {'★'.repeat(Math.floor(product.rating))}
                                        {'☆'.repeat(5 - Math.floor(product.rating))}
                                    </span>
                                    <span className="ms-2 text-muted">({product.rating})</span>
                                    <span className="ms-2 text-muted">• {product.reviews} reviews</span>
                                </div>

                                <div className="price mb-3">
                                    <h3 className="text-primary">{product.amount}</h3>
                                </div>

                                <div className="description mb-4">
                                    <p>{product_detail.desc}</p>
                                </div>

                                {/* Size Selection */}
                                <div className="size-selection mb-4">
                                    <h6>{size}:</h6>
                                    <div className="d-flex gap-2">
                                        {product.id === 1 ? (
                                            <>
                                                <button className="btn btn-outline-secondary btn-sm" disabled>30ml</button>
                                                <button className="btn btn-primary btn-sm">50ml</button>
                                                <button className="btn btn-outline-secondary btn-sm" disabled>100ml</button>
                                            </>
                                        ) : (
                                            product.sizes.map((size, index) => (
                                                <button key={index} className="btn btn-primary btn-sm">
                                                    {size}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>

                                {/* Format Selection for Natural Deodorant */}
                                {product.id === 3 && (
                                    <div className="format-selection mb-4">
                                        <h6>Format:</h6>
                                        <div className="d-flex gap-2">
                                            <button 
                                                className={`btn btn-sm ${selectedFormat === 'Roll-on' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                                onClick={() => setSelectedFormat('Roll-on')}
                                            >
                                                Roll-on
                                            </button>
                                            <button 
                                                className={`btn btn-sm ${selectedFormat === 'Pot' ? 'btn-primary' : 'btn-outline-secondary'}`}
                                                onClick={() => setSelectedFormat('Pot')}
                                            >
                                                Pot
                                            </button>
                                        </div>
                                    </div>
                                )}



                                {/* Add to Cart */}
                                <div className="add-to-cart mb-4">
                                    <div className="d-flex gap-3 align-items-center">
                                        <div className="quantity-selector d-flex align-items-center border rounded">
                                            <button 
                                                className="btn btn-sm border-0" 
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            >
                                                -
                                            </button>
                                            <span className="px-3">{quantity}</span>
                                            <button 
                                                className="btn btn-sm border-0" 
                                                onClick={() => setQuantity(quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button 
                                            className={`btn flex-grow-1 ${product.inStock ? 'btn-primary' : 'btn-secondary'}`}
                                            disabled={!product.inStock}
                                            onClick={() => {
                                                if (!product.inStock) {
                                                    alert(language === 'en' ? translations.product_out_of_stock : translations.product_out_of_stock);
                                                    return;
                                                }
                                                
                                                if (selectedSize || product.sizes.length === 1) {
                                                    // Check if format is required (for deodorant)
                                                    if (product.id === 3 && !selectedFormat) {
                                                        alert(language === 'en' ? translations.please_select_format : translations.please_select_format);
                                                        return;
                                                    }
                                                    
                                                    addToCart({
                                                        id: product.id,
                                                        product: product.product,
                                                        size: selectedSize || product.sizes[0],
                                                        format: selectedFormat || undefined,
                                                        price: parseFloat(product.amount.replace(/[^0-9]/g, '')),
                                                        quantity: quantity,
                                                        image: product.image1
                                                    });
                                                } else {
                                                    alert(language === 'en' ? translations.please_select_size : translations.please_select_size);
                                                }
                                            }}
                                        >
                                            {product.inStock ? (language === 'en' ? translations.add_to_cart : translations.add_to_cart) : (language === 'en' ? translations.out_of_stock : translations.out_of_stock)}
                                        </button>
                                    </div>
                                </div>

                                {/* Stock Status */}
                                <div className="stock-status mb-4">
                                    {product.inStock ? (
                                        <span className="text-success">
                                            <i className="mdi mdi-check-circle me-1"></i>
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="text-danger">
                                            <i className="mdi mdi-close-circle me-1"></i>
                                            Out of Stock
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Products */}
            <section className="section" style={{marginTop: '-110px'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="mb-4">{language === 'en' ? translations.other_products : translations.other_products}</h4>
                        </div>
                    </div>
                    <div className="row">
                        {productData.filter(p => p.id !== product.id).slice(0, 3).map((item, index) => (
                            <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2" key={index}>
                                <div className="card product-card">
                                    <div className="position-relative">
                                        <Image 
                                            src={item.image1} 
                                            width={300} 
                                            height={300} 
                                            className="card-img-top" 
                                            alt={item.product}
                                            style={{ objectFit: 'cover', height: '250px' }}
                                        />
                                        {item.tag && (
                                            <span className={`badge ${item.tagClass} position-absolute top-0 start-0 m-2`}>
                                                {item.tag}
                                            </span>
                                        )}
                                    </div>
                                    <div className="card-body">
                                        <h6 className="card-title">{item.product}</h6>
                                        <div className="d-flex align-items-center mb-2">
                                            <ul className="list-unstyled text-warning mb-0 me-2">
                                                {[...Array(5)].map((_, index) => (
                                                    <li key={index} className="list-inline-item">
                                                        <i className={`mdi ${index < Math.floor(item.rating || 0) ? 'mdi-star' : 'mdi-star-outline'}`}></i>
                                                    </li>
                                                ))}
                                            </ul>
                                            <span className="text-muted small">({item.rating || 0})</span>
                                        </div>
                                        <p className="card-text text-primary fw-bold">{item.amount}</p>
                                        <Link href={`/products/${item.id}`} className="btn btn-outline-primary btn-sm">
                                            {language === 'en' ? translations.view_details : translations.view_details}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <CafeFooter/>
            <ScrollTop/>
            
            {/* Bouton WhatsApp flottant */}
            <WhatsAppButton />
        </>
    );
} 