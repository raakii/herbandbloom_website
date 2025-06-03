'use client'
import React,{useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import NavbarTwo from "../../components/navbarTwo.js";
import { useTranslations } from "./hooks/useTranslations";
import { useLanguage } from "./context/LanguageContext";

import { Parallax } from 'react-parallax';

const TinySlider = dynamic(()=>import("tiny-slider-react"),{ssr:false})
import 'tiny-slider/dist/tiny-slider.css';
import CafeFooter from "../../components/cafeFooter";
import ScrollTop from "../../components/scrollTop.js";

export default function Cafe(){
    const translations = useTranslations();
    const { language } = useLanguage();
    const { aboutData, menuData, clientData } = translations;

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
    return(
        <>
        <NavbarTwo navClass="defaultscroll sticky" manuClass="navigation-menu nav-right nav-light" navDark={false}/>

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
                    <div className="mt-4">
                    <button
                        className="btn btn-font-sm btn-lg btn-primary text-uppercase mt-2 kaushan-font"
                        onClick={() => {
                        const phoneNumber = "+221776588190";
                        const message = language === 'en' 
                            ? "Hi! I want to order a Bloom & Grow oil. Here's my info:\n• Name:\n• Delivery address:\n• Quantity:"
                            : "Salut ! Je veux commander une huile Bloom & Grow. Voici mes infos :\n• Nom :\n• Adresse de livraison :\n• Quantité :";
                        const encodedMessage = encodeURIComponent(message);
                        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                        window.open(whatsappURL, '_blank');
                        }}
                    >
                        {language === 'en' ? 'Order Now' : 'Commander'}
                    </button>
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

        <section className="section">
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
                                    <div className="d-flex flex-column flex-md-row justify-content-between border-bottom pb-2">
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
                                    <p className="text-muted mb-0 mt-2">{item.desc}</p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <button 
                                    onClick={() => {
                                        const phoneNumber = "+221776588190";
                                        const message = language === 'en' 
                                            ? "Hi! I want to order a Bloom & Grow oil. Here's my info:\n• Name:\n• Delivery address:\n• Quantity:"
                                            : "Salut ! Je veux commander une huile Bloom & Grow. Voici mes infos :\n• Nom :\n• Adresse de livraison :\n• Quantité :";
                                        const encodedMessage = encodeURIComponent(message);
                                        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                                        window.open(whatsappURL, '_blank');
                                    }}
                                    className="btn btn-font-sm btn-lg btn-primary text-uppercase mt-2"
                                >
                                    {language === 'en' ? 'Order Now' : 'Commander'}
                                </button>
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
            <div className="container pt-sm-150 ">
                <div className="row justify-content-end">
                    <div className="col-md-6 px-0">
                        <div className="bg-white bg-cta px-3 px-md-4 px-lg-5">
                            <div className="section-title text-center">
                                <Image src='/images/checkout.svg' width={45} height={45} className="avatar avatar-md-sm" alt=""/>
                                <h4 className="title mt-2">{language === 'en' ? 'How to order' : 'Comment commander'}</h4>
                                <h6 className="text-primary">{language === 'en' ? 'Click this button below' : 'Cliquez sur ce bouton ci-dessous'}</h6>
                                <p className="text-muted my-4 px-lg-4">
                                    {language === 'en' 
                                        ? "We're currently taking orders through WhatsApp! Just click the button below, fill in your name, delivery address, and quantity — and we'll take care of the rest."
                                        : "Nous prenons actuellement les commandes via WhatsApp ! Cliquez simplement sur le bouton ci-dessous, remplissez votre nom, votre adresse de livraison et la quantité — et nous nous occupons du reste."}
                                </p>
                                <Link href="tel:+221776588190" className="text-primary h6">+221 77 658 81 90</Link>
                                <div className="mt-4 pt-2">
                                    <button 
                                        onClick={() => {
                                            const phoneNumber = "+221776588190";
                                            const message = language === 'en' 
                                                ? "Hi! I want to order a Bloom & Grow oil. Here's my info:\n• Name:\n• Delivery address:\n• Quantity:"
                                                : "Salut ! Je veux commander une huile Bloom & Grow. Voici mes infos :\n• Nom :\n• Adresse de livraison :\n• Quantité :";
                                            const encodedMessage = encodeURIComponent(message);
                                            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                                            window.open(whatsappURL, '_blank');
                                        }}
                                        className="btn btn-font-sm btn-lg btn-primary text-uppercase mt-2"
                                    >
                                        {language === 'en' ? 'Order Now' : 'Commander'}
                                    </button>
                                </div>
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
                                {language === 'en' ? 'Discover Bloom & Grow' : 'Découvrez Bloom & Grow'}
                            </h4>
                            <p className="text-muted mx-auto para-desc mb-0">
                                {language === 'en' ? (
                                    <>
                                        One Formula. Infinite Care.
                                        Bloom & Grow is a handcrafted herbal oil designed to restore your hair's vitality and celebrate your natural beauty. Made with love, passion, and years of herbal practice, it blends powerful botanicals like rosemary, moringa, lavender, fenugreek, hibiscus, and peppermint into a rich base of argan, coconut, olive, and castor oil — to nourish, strengthen, and awaken your strands naturally.
                                    </>
                                ) : (
                                    <>
                                        Une Formule. Des Soins Infinis.
                                        Bloom & Grow est une huile aux herbes artisanale conçue pour restaurer la vitalité de vos cheveux et célébrer votre beauté naturelle. Fabriquée avec amour, passion et des années de pratique des plantes, elle mélange des plantes puissantes comme le romarin, le moringa, la lavande, le fenugrec, l'hibiscus et la menthe poivrée dans une riche base d'huile d'argan, de coco, d'olive et de ricin — pour nourrir, fortifier et réveiller vos cheveux naturellement.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="row text-md-end text-center">
                            {aboutData.slice(0,3).map((item,index)=>{
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
                                {language === 'en' ? 'Herbs at Their Best' : 'Herbes à Leur Meilleur'}
                            </h4>
                            <p className="text-white-50 mb-0">
                                {language === 'en' 
                                    ? "If you are going to use a natural hair oil, choose one packed with fresh, potent herbs. Ours is crafted to bring your roots to life and your strands to strength — with every drop."
                                    : "Si vous allez utiliser une huile capillaire naturelle, choisissez-en une remplie d'herbes fraîches et puissantes. La nôtre est conçue pour donner vie à vos racines et de la force à vos cheveux — avec chaque goutte."}
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
        <section className="section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-6 col-12">
                        <Image src='/images/IMG_2156.jpg' width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid rounded shadow-md" alt=""/> 
                    </div>

                    <div className="col-lg-7 col-md-6 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="section-title ms-lg-5">
                            <h5 className="fw-semibold mb-3">Raki Diallo</h5>

                            <p className="text-muted">
                                {language === 'en' 
                                    ? "I've always had a deep love for my natural hair, for its strength, its texture, its story. From a young age, I started experimenting with oils and herbs, learning how to care for my afro hair and watching it thrive. Over time, it became more than a routine, it became a passion."
                                    : "J'ai toujours eu un amour profond pour mes cheveux naturels, pour leur force, leur texture, leur histoire. Dès mon plus jeune âge, j'ai commencé à expérimenter avec des huiles et des herbes, apprenant à prendre soin de mes cheveux afro et à les voir s'épanouir. Avec le temps, c'est devenu plus qu'une routine, c'est devenu une passion."}
                            </p>
                            
                            <p className="text-muted mb-0">
                                {language === 'en'
                                    ? "I love creating, testing, crafting formulas with my own hands and seeing them come to life. Bloom & Grow was born from that passion: a love for hair, for nature, and for making something that truly helps others feel confident and cared for."
                                    : "J'adore créer, tester, élaborer des formules de mes propres mains et les voir prendre vie. Bloom & Grow est née de cette passion : un amour pour les cheveux, pour la nature, et pour créer quelque chose qui aide vraiment les autres à se sentir confiants et bien soignés."}
                            </p>
                            <Image src='/images/IMG2.JPG' width={0} height={0} sizes="100vw" className="avatar avatar-medium mt-3" style={{width:'110px', height:'auto'}} alt=""/> 

                            <div className="mt-3">
                                <small className="text-uppercase fw-medium">
                                    {language === 'en' ? 'CEO & Founder Herb&Bloom' : 'PDG & Fondatrice Herb&Bloom'}
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
                                <Link href="tel:+221776588190" className="text-foot" style={{ color: "#e6ccb2" }}>+221 77 658 81 90</Link>
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
        </>
    )
}