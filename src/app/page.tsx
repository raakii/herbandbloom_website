'use client'
import React,{useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import NavbarTwo from "../../components/navbarTwo";
import { useTranslations } from "./hooks/useTranslations";
import { useLanguage } from "./context/LanguageContext";
import OrderButton from "./components/OrderButton";
import Product from "../../components/product";
import { useCart } from "./context/CartContext";
import SlidingCart from "./components/SlidingCart";
import CartButton from "./components/CartButton";
import WhatsAppButton from "./components/WhatsAppButton";

import { Parallax } from 'react-parallax';

const TinySlider = dynamic(()=>import("tiny-slider-react"),{ssr:false})
import 'tiny-slider/dist/tiny-slider.css';
import CafeFooter from "../../components/cafeFooter";
import ScrollTop from "../../components/scrollTop";
import { StaticImport } from "next/dist/shared/lib/get-img-props.js";

export default function Cafe(){
    const translations = useTranslations();
    const { language } = useLanguage();
    const { aboutData, menuData, clientData } = translations;
    const { cartItems, isCartOpen, openCart, closeCart, updateQuantity, removeFromCart, addToCart, clearCart, cartCount } = useCart();

    let settings = {
        container: '.tiny-single-item',
        items: 1,
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
        nav: false,
        speed: 400,
        gutter: 0,
    };
    useEffect(()=>{
        document.body.classList.add('cafe-css');
    },[])

    const productData =[
        {
            id:1,
            image1:'/images/IMG_2559.jpeg',
            image2:'/images/IMG_2576.jpg',
            product:'Bloom&Grow Hair Oil',
            amount:'10 000 Fcfa',
            sizes: ['50ml'],
            inStock: true,
        },
        // {
        //     id:3,
        //     image1:'/images/IMG10.png',
        //     image2:'/images/IMG10.png',
        //     tag:'Sale',
        //     tagClass:'text-bg-dark',
        //     product:'Natural Deodorant',
        //     amount:'$18.99',
        //     inStock: true,
        // },
        {
            id:2,
            image1:'/images/IMG_5474.JPG',
            image2:'/images/IMG_5454.JPG',
            tag:'New',
            tagClass:'text-bg-primary',
            product:'Bloom & Butter Hair Cream',
            amount:'5 000 Fcfa',
            sizes: ['150ml'],
            inStock: true,
        },
        {
            id:4,
            image1:'/images/henné.png',
            image2:'/images/henné2.png',
            tag:'New',
            tagClass:'text-bg-primary',
            product:'Henna Powder',
            amount:'2 000 Fcfa',
            sizes: ['150g'],
            inStock: true,
        },
    ]
   
    return(
        <>
        <NavbarTwo navClass="defaultscroll sticky" manuClass="navigation-menu nav-right nav-light" navDark={false}/>
        
        {/* Cart Components */}
        <SlidingCart 
            isOpen={isCartOpen}
            onClose={closeCart}
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
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
                title="View Cart"
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
        
        

        <section className="bg-half-260 d-table w-100 overflow-hidden" id="home" style={{backgroundImage:"url('/images/IMG_2559.jpeg')"}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
            <div className="row mt-5 justify-content-center">
                <div className="col-12">
                <div className="title-heading text-center" style={{transform:'rotate(-15deg)'}}>
                    <style jsx>{`
                        @import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap');
                        .kaushan-font {
                            font-family: 'Kaushan Script', cursive;
                        }
                    `}</style>
                    <span className="title fw-semibold text-white title-dark mb-3 d-block kaushan-font">Herb and<br/> Bloom</span>
                    <span className="text-white-50 fw-normal kaushan-font">
                        {language === 'en' ? 'Nurturing Hair & Heritage Since 2025' : 'Soins des Cheveux & Héritage Depuis 2025'}
                    </span>
                    <div className="mt-4 kaushan-font d-flex justify-content-center">
                        <OrderButton />
                    </div>
                    <div className="position-absolute end-0 top-0 mt-3 me-3" style={{ zIndex: 10 }}>
                        <div
                            className="badge text-white fw-bold kaushan-font"
                            style={{
                                backgroundColor: '#6b4f27',
                                borderRadius: '2.5rem',
                                fontSize: 'clamp(1.2rem, 5vw, 2.25rem)',
                                padding: '0.7em 1.2em',
                                letterSpacing: 2,
                                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                                lineHeight: 1.1,
                                minWidth: 0,
                                minHeight: 0,
                                textAlign: 'center',
                                position: 'relative',
                                top: '2.5rem'
                            }}
                        >
                            33% OFF
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>

        <section className="section pt-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h3 className="mb-0">{translations.products_title}</h3>
                            <Link href="/products" className="btn btn-outline-primary btn-sm">
                                {translations.see_all_products}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {productData.map((item,index)=>{
                        return(
                            <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2" key={index}>
                                <Product item={item} onAddToCart={addToCart} onOpenCart={openCart}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>

        <section className="section">
        <div className="section-title text-center mb-4 pb-2">
        <h4 className="title mb-4">Our muse, Bloom & Grow Hair Oil</h4>
        </div>
            <div className="row mt-4 pt-2 justify-content-center">
                {menuData.map((item, index) => {
                    return (
                        <div className="col-lg-8 col-md-8 " key={index}>
                            <div className="portfolio portfolio-primary d-flex align-items-center p-2 pt-3 pb-3 flex-column flex-md-row">
                                <Image
                                    src={item.image}
                                    width={1200}
                                    height={1200}
                                    className="img-fluid shadow rounded-pill avatar mb-3 mb-md-0"
                                    style={{ maxWidth: '260px', height: 'auto', marginRight: '2rem' }}
                                    alt="img"
                                />
                                <div className="flex-1 ms-md-4 w-100 ">
                                    <div className="d-flex flex-column flex-xl-row justify-content-between border-bottom pb-2">
                                        <span className="text-dark title h6 mb-2 mb-md-0 fw-semibold text-center text-md-start" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {item.title}
                                        </span>
                                        <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                                            <span style={{ fontWeight: 700, fontSize: "clamp(20px, 5vw, 34px)", color: "#888", textDecoration: "line-through", marginRight: 20 }}>
                                                15 000
                                            </span>
                                            <span style={{ fontWeight: 900, fontSize: "clamp(18px, 4.5vw, 32px)", color: "#537660 " }}>
                                                10 000
                                            </span>
                                            <span style={{ marginLeft: 12, fontWeight: 600, fontSize: "clamp(16px, 4vw, 28px)", color: "#888" }}>
                                                FCFA
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-muted mb-0 mt-2 text-center text-md-start">{item.desc}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <OrderButton />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>

        <section className="position-relative w-100 overflow-hidden ">
            <Parallax
                blur={{ min: 0, max: 0}}
                bgImage='/images/IMG_2576.jpeg'
                bgImageAlt="the dog"
                strength={500}
                bgStyle={{with:"auto", height:"100%" }}
                style={{position:"absolute", width:"100%" , height:"100%"}}
            />
            <div className="container pt-sm-50 ">
                <div className="row justify-content-end">
                    <div className="col-md-6 px-0">
                        <div className="bg-white bg-cta px-3 px-md-4 px-lg-5">
                            <div className="section-title text-center">
                                <Image src='/images/checkout.svg' width={45} height={45} className="avatar avatar-md-sm" alt=""/>
                                <h4 className="title mt-2">{language === 'en' ? translations.how_to_order_title : translations.how_to_order_title}</h4>
                                <h6 className="text-primary">{language === 'en' ? translations.how_to_order_subtitle : translations.how_to_order_subtitle}</h6>
                                <p className="text-muted my-4 px-lg-4">
                                    {language === 'en' 
                                        ? translations.order_instructions
                                        : translations.order_instructions}
                                </p>
                                
                                <br />
                                <Link 
                                    href="https://wa.me/221776588190?text=Bonjour%20!%20Je%20suis%20intéressé(e)%20par%20vos%20produits%20Herb%20%26%20Bloom.%20Pouvez-vous%20me%20donner%20plus%20d'informations%20?"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-success btn-lg mt-3"
                                    style={{ backgroundColor: '#25D366', borderColor: '#25D366', fontSize: '18px', padding: '12px 24px' }}
                                >
                                    <i className="mdi mdi-whatsapp me-2"></i>
                                    {language === 'en' ? 'WhatsApp' : 'WhatsApp'}
                                </Link>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="about" className="section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="section-title text-center mb-4 pb-2">
                            <h4 className="title mb-4">
                                {language === 'en' ? translations.discover_title : translations.discover_title}
                            </h4>
                            <p className="text-muted mx-auto para-desc mb-0">
                                {language === 'en' ? translations.discover_desc : translations.discover_desc}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="row text-md-end text-center">
                            {aboutData.slice(0,3).map((item: { image: string | StaticImport; title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; desc: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; },index: React.Key | null | undefined)=>{
                                return(
                                <div className="col-12 mt-4 pt-2" key={index}>
                                    <div className="card features feature-primary border-0">
                                        <div className="ms-md-auto me-md-0 mx-auto">
                                            <Image src={item.image} width={65} height={65} className="avatar avatar-small rounded-circle p-3 shadow-md bg-white title-bg-dark" alt=""/>
                                        </div>
                                        <div className="card-body p-0 mt-3">
                                            <Link href="#" className="title text-dark h5">{item.title}</Link>
                                            <p className="text-muted mb-0 mt-2">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className="col-lg-4 order-md-0 order-2 d-md-none d-lg-block mt-4 pt-2">
                        <Image src='/images/IMG_2666-removebg.png' width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="row text-md-start text-center">
                            {aboutData.slice(3,6).map((item,index)=>{
                                return(
                                <div className="col-12 mt-4 pt-2" key={index}>
                                    <div className="card features feature-primary border-0">
                                        <div className="me-md-auto ms-md-0 mx-auto">
                                            <Image src={item.image} width={65} height={65} className="avatar avatar-small rounded-circle p-3 shadow-md bg-white title-bg-dark" alt=""/>
                                        </div>
                                        <div className="card-body p-0 mt-3">
                                            <Link href="#" className="title text-dark h5">{item.title}</Link>
                                            <p className="text-muted mb-0 mt-2">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>

       

        <section className="bg-cta position-relative" style={{backgroundImage:"url('/images/IMG_2559 copy.jpeg')", backgroundPosition:'center'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row align-items-center">                    
                    <div className="col-lg-6 col-12 mt-4 mt-lg-0 pt-2 pt-lg-0 order-lg-1 order-2">
                        <div className="section-title ms-lg-4 text-center text-lg-start">
                            <h4 className="title text-white title-dark text-uppercase mb-4">
                                {language === 'en' ? translations.herbs_at_their_best_title : translations.herbs_at_their_best_title}
                            </h4>
                            <p className="text-white-50 mb-0">
                                {language === 'en' 
                                    ? translations.herbs_at_their_best_desc
                                    : translations.herbs_at_their_best_desc}
                            </p>
                        </div>
                    </div>
                    
                    <div className="col-lg-3 col-md-6 col-12 order-lg-2 order-1">
                        <Image src='/images/IMG_2610.jpeg' width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid rounded" alt=""/>
                    </div>
                    <div className="col-lg-3 col-md-6 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0 order-lg-2 order-1">
                        <Image src='/images/IMG_2559.jpeg' width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid rounded" alt=""/>
                    </div>
                </div>
            </div>
        </section>
 {/* Coming Soon Section */}
 <section className="section bg-light">
            <div className="container">
                <div className="row align-items-center">
                    {/* Content Column */}
                    <div className="col-lg-6 col-md-12">
                        <div className="section-title text-center text-lg-start mb-4 pb-2">
                            <div className="d-flex justify-content-center justify-content-lg-start mb-3">
                               
                            </div>
                            <h4 className="title mb-4">
                                {language === 'en' ? translations.coming_soon_title : translations.coming_soon_title}
                            </h4>
                            <p className="text-muted para-desc mb-4">
                                {language === 'en' ? translations.coming_soon_desc : translations.coming_soon_desc}
                            </p>
                            
                            {/* Email Signup Form */}
                            <div className="card border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <form className="d-flex flex-column flex-md-row gap-3">
                                        <div className="flex-grow-1">
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                placeholder={language === 'en' ? translations.email_placeholder : translations.email_placeholder}
                                                required
                                            />
                                        </div>
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary px-4"
                                        >
                                            {language === 'en' ? translations.join_waiting_list : translations.join_waiting_list}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Image Column */}
                    <div className="col-lg-6 col-md-12 mt-4 mt-lg-0">
                        <div className="text-center">
                            <div className="position-relative">
                            <Image src='/images/deo1.png' width={0} height={0} sizes="100vw" style={{width:'60%', height:'auto'}} className="img-fluid rounded" alt=""/>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-6 col-12">
                        <Image src='/images/IMG_2156.jpg' width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid rounded shadow-md" alt=""/> 
                    </div>

                    <div className="col-lg-7 col-md-6 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="section-title ms-lg-5 text-center text-lg-start">
                            <h5 className="fw-semibold mb-3">Raki Diallo</h5>

                            <p className="text-muted">
                                {language === 'en' 
                                    ? translations.founder_bio_p1
                                    : translations.founder_bio_p1}
                            </p>
                            
                            <p className="text-muted mb-0">
                                {language === 'en'
                                    ? translations.founder_bio_p2
                                    : translations.founder_bio_p2}
                            </p>
                            <Image src='/images/IMG2.JPG' width={0} height={0} sizes="100vw" className="avatar avatar-medium mt-3" style={{width:'110px', height:'auto'}} alt=""/> 

                            <div className="mt-3">
                            
                                <small className="text-uppercase fw-medium">
                                    {language === 'en' ? translations.founder_title : translations.founder_title}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="contact" className="container mt-5 mt-lg-7 mt-xl-8">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card border-0 text-center features feature-clean bg-transparent">
                            <div className="icons text-primary text-center mx-auto">
                            </div>
                            <div className="content mt-3">
                                <h5 className="footer-head">
                                    {language === 'en' ? 'Phone' : 'Téléphone'}
                                </h5>
                                <p className="text-muted">
                                    {language === 'en' ? 'Contact us directly or via Whatsapp' : 'Contactez-nous directement ou via Whatsapp'}
                                </p>

                                <Link 
                                    href="https://wa.me/221776588190?text=Bonjour%20!%20Je%20suis%20intéressé(e)%20par%20vos%20produits%20Herb%20%26%20Bloom.%20Pouvez-vous%20me%20donner%20plus%20d'informations%20?"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-success btn-lg mt-3"
                                    style={{ backgroundColor: '#25D366', borderColor: '#25D366', fontSize: '18px', padding: '12px 24px' }}
                                >
                                    <i className="mdi mdi-whatsapp me-2"></i>
                                    {language === 'en' ? 'WhatsApp' : 'WhatsApp'}
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-4 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="card border-0 text-center features feature-clean bg-transparent">
                            <div className="icons text-primary text-center mx-auto">
                            </div>
                            <div className="content mt-3">
                                <h5 className="footer-head">
                                    {language === 'en' ? 'Email' : 'Email'}
                                </h5>
                                <p className="text-muted">
                                    {language === 'en' ? 'Send us an email' : 'Envoyez-nous un email'}
                                </p>
                                <Link href="mailto:herbandbloom3@gmail.com" className="text-foot" style={{ color: "#e6ccb2" }}>herbandbloom3@gmail.com</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-4 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="card border-0 text-center features feature-clean bg-transparent">
                            <div className="icons text-primary text-center mx-auto">
                            </div>
                            <div className="content mt-3">
                                <h5 className="footer-head">
                                    {language === 'en' ? 'Instagram' : 'Instagram'}
                                </h5>
                                <p className="text-muted">@herb_and_bloom_<br/></p>
                                <Link href="https://www.instagram.com/herb_and_bloom_?igsh=dThxNnpidXFybnl5&utm_source=qr"
                                    data-type="iframe" className="video-play-icon text-foot lightbox" style={{ color: "#e6ccb2" }}>
                                    {language === 'en' ? 'View on Instagram' : 'Voir sur Instagram'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <CafeFooter/>
        <ScrollTop/>
        
        {/* Bouton WhatsApp flottant */}
        <WhatsAppButton />
        </>
    )
}