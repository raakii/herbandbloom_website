'use client'
import React,{useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import 'tiny-slider/dist/tiny-slider.css';

import "../../../node_modules/wowjs/css/libs/animate.css"
import NavbarTwo from "../../../components/navbarTwo";
import Product from "../../../components/product";
import ScrollTop from "../../../components/scrollTop";
import CafeFooter from "../../../components/cafeFooter";
import { useCart } from "../context/CartContext";
import SlidingCart from "../components/SlidingCart";
import WhatsAppButton from "../components/WhatsAppButton";

const productData =[
    {
        id:1,
        image1:'/images/IMG_2576.jpg',
        image2:'/images/IMG_2576.jpg',
        product:'Bloom&Grow Hair Oil',
        amount:'10 000 Fcfa',
        sizes: ['50ml'],
        inStock: true,
    },
    // {
    //     id:2,
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
const productData2 =[
    {
        id:1,
        image1:'/images/IMG_2576.jpg',
        image2:'/images/IMG_2576.jpg',
        product:'Bloom&Grow Hair Oil',
        amount:'10 000 Fcfa',
        sizes: ['50ml'],
        inStock: true,
    },
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

export default function IndexFashion(){
    const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, addToCart, openCart, clearCart, cartCount } = useCart();
    
    useEffect(()=>{
        document.body.classList.add('restaurant-css');
        import('wowjs').then((WOW) => {
            const wow = new WOW.default({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                live: true
            });
        });
    },[])

    let settings = {
        container: '.tiny-four-item',
        controls: false,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        speed: 400,
        gutter: 12,
        responsive: {
            992: {
                items: 2
            },
    
            767: {
                items: 1
            },
    
            320: {
                items: 1
            },
        },
      };
    
    return(
        <>
        <NavbarTwo navClass="defaultscroll sticky" manuClass="navigation-menu nav-right nav-light" navDark={false}/>
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
        
        {/* Bouton WhatsApp flottant */}
        <WhatsAppButton />
        
        {/* <section className="home-slider position-relative">
            <Carousel showArrows={false} selectedItem={0} infiniteLoop={true} autoPlay={true} interval={3000} showStatus={false} showThumbs={false} >
                <div>
                    <div className="bg-home d-flex align-items-center" style={{backgroundImage:"url('/images/IMG_2559.jpeg')"}}>
                        <div className="bg-overlay bg-gradient-white-overlay"></div>
                        <div className="container">
                            <div className="row mt-5 mt-sm-0 align-items-center">
                                <div className="col-lg-6 offset-lg-6 col-md-8 offset-md-4">
                                    <div className="title-heading mt-4 position-relative">
                                        <h4 className="heading fw-bold mb-3 animated fadeInUpBig animation-delay-1"> <span className="position-relative text-type-element">Natural</span> Cosmetic</h4>
                                        <p className="text-muted title-dark mx-auto para-desc animated fadeInUpBig animation-delay-2">Our products are made with the best ingredients and are 100% natural.</p>
                                        
                                        <div className="mt-4 pt-2">
                                            <Link href="#products" className="btn btn-primary animated fadeInUpBig animation-delay-3">Explore Now</Link>
                                        </div>

                                        <div className="position-absolute top-0 start-50 translate-middle">
                                            <Image src='/images/shop/rounded-shape.png' width={0} height={0} style={{width:'0', height:'auto'}} className="mover" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-home d-flex align-items-center" style={{backgroundImage:"url('/images/IMG_2557.jpeg')"}}>
                        <div className="bg-overlay bg-gradient-white-overlay"></div>
                        <div className="container">
                            <div className="row mt-5 mt-sm-0 align-items-center">
                                <div className="col-lg-6 col-md-8">
                                    <div className="title-heading mt-4 position-relative">
                                        <h4 className="heading fw-bold mb-3 animated fadeInUpBig animation-delay-1">Purest <br/> <span className="position-relative text-type-element">Compositions</span> Ever</h4>
                                        <p className="text-muted title-dark mx-auto para-desc animated fadeInUpBig animation-delay-2">Helping you achieve your best hair and skin health.</p>
                                        
                                        <div className="mt-4 pt-2">
                                            <Link href="#products" className="btn btn-primary animated fadeInUpBig animation-delay-3">Shop Now</Link>
                                        </div>

                                        <div className="position-absolute top-0 start-0 translate-middle">
                                            <Image src='/images/shop/rounded-shape.png' width={0} height={0} style={{width:'0', height:'auto'}} className="mover" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </section> */}
        <section id="products" className="section pt-5" style={{marginTop: '120px'}}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h5 className="mb-0">Products</h5>
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

            {/* <div className="container mt-100 mt-60">
                <div className="row g-4">
                    <div className="col-lg-6 col-md-6">
                        <div className="bg-soft-secondary shop-advertise rounded p-4 py-md-5 px-lg-5">
                            <div className="border border-2 rounded p-4 py-md-5 px-lg-4 me-lg-5">
                                <ul className="card list-unstyled mb-0">
                                    <li><Link href="#" className="h4 text-dark">Mid Season Sale <br/> Up To 50% Off</Link></li>
    
                                    <li className="mt-4"><Link href="#" className="text-secondary border-bottom">Shop now</Link></li>
                                </ul>
                                <Image src='/images/shop/items/f1.png' width={280} height={280}  className="img-fluid ad-image" alt=""/>
                            </div>
                        </div>
                    </div>
    
                    <div className="col-lg-6 col-md-6">
                        <div className="bg-soft-info shop-advertise rounded p-4 py-md-5 px-lg-5">
                            <div className="border border-2 rounded p-4 py-md-5 px-lg-4 me-lg-5">
                                <ul className="card list-unstyled mb-0">
                                    <li><Link href="#" className="h4 text-dark">Summer Sale <br/> Up To 30% Off</Link></li>
    
                                    <li className="mt-4"><Link href="#" className="text-secondary border-bottom">Shop now</Link></li>
                                </ul>
    
                                <Image src='/images/shop/items/bag.png' width={280} height={280} className="img-fluid ad-image" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="container mt-100 mt-60">
                <div className="row">
                    <div className="col-12">
                        <h5 className="mb-0">Popular Products</h5>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mt-4 pt-2">
                        <div className="tiny-four-item">
                            <TinySlider settings={settings}>
                                {productData2.map((item,index)=>{
                                    return(
                                    <div className="tiny-slide" key={index}>
                                        <Product item={item} onAddToCart={addToCart} onOpenCart={openCart}/>
                                    </div>
                                    )
                                })}
                            </TinySlider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <CafeFooter/>
        <ScrollTop/>
        </>
    )
}