'use client'
import React,{useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import NavbarTwo from "../../components/navbarTwo.js";

import { aboutData, menuData, clientData } from "./data.js";

import { Parallax } from 'react-parallax';

const TinySlider = dynamic(()=>import("tiny-slider-react"),{ssr:false})
import 'tiny-slider/dist/tiny-slider.css';
import CafeFooter from "../../components/cafeFooter";
import ScrollTop from "../../components/scrollTop.js";

export default function Cafe(){
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
                            <span className="title fw-semibold text-white title-dark mb-3 d-block">Herb and<br/> Bloom</span>
                            <span className="text-white-50 fw-normal">Nurturing Hair & Heritage Since 2025</span>
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
                            <h4 className="title mb-4">Welcome to Herb & Bloom</h4>
                            <p className="text-muted para-desc mx-auto">Our natural herbal oil is handcrafted to revive your hair's vitality and celebrate your beauty rituals. Inspired by traditional care and infused with powerful botanicals like rosemary, moringa, lavender, fenugreek, hibiscus, and peppermint — all in a rich blend of argan, coconut, olive, and castor oil.</p>
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
                        <div className="bg-white  bg-cta px-3 px-md-4 px-lg-5">
                            <div className="section-title text-center">
                                <Image src='/images/checkout.svg' width={45} height={45} className="avatar avatar-md-sm" alt=""/>
                                <h4 className="title mt-2">How to order</h4>
                                <h6 className="text-primary">Click this button below</h6>

                                <p className="text-muted my-4 px-lg-4">We’re currently taking orders through WhatsApp! Just click the button below, fill in your name, delivery adre, and quantity — and we’ll take care of the rest.</p>
                            
                                <Link href="tel:+221776588190" className="text-primary h6">+221 77 658 81 90</Link>

                                <div className="mt-4 pt-2">
                                  <button 
                                      onClick={() => {
                                          const phoneNumber = "+221776588190"; // Replace with your WhatsApp number
                                          const message = "Salut ! Je veux commander une huile Bloom & Grow. Voici mes infos :\n• Nom :\n• Adresse de livraison :\n• Quantité :";
                                          const encodedMessage = encodeURIComponent(message);
                                          const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                                          window.open(whatsappURL, '_blank');
                                      }}
                                      className="btn btn-font-sm btn-lg btn-primary text-uppercase mt-2"
                                  >
                                      Order Now
                                  </button>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="section-title text-center mb-4 pb-2">
                            <h4 className="title mb-4">Discover Bloom & Grow</h4>
                            <p className="text-muted mx-auto para-desc mb-0">One formula. Infinite care. Bloom & Grow is handcrafted to nourish, strengthen, and bring your hair back to life naturally. We’ve poured love, passion, and years of herbal knowledge into one powerful product.</p>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 pt-2">
                  {menuData.map((item, index) => {
                    return (
                      <div className="col-lg-11 col-md-11" key={index}>
                        <div
                          className="portfolio portfolio-primary d-flex align-items-center p-2 pt-3 pb-3 flex-column flex-md-row"
                        >
                          <Image
                            src={item.image}
                            width={1200}
                            height={1200}
                            className="img-fluid shadow rounded-pill avatar mb-3 mb-md-0"
                            style={{ maxWidth: '260px', height: 'auto', marginRight: '2rem' }}
                            alt="img"
                          />
                          <div className="flex-1 ms-md-4 w-100">
                            <div className="d-flex justify-content-between border-bottom pb-2">
                              <Link href="#" className="text-dark title h6 mb-0 fw-semibold">{item.title}</Link>
                              <span className="float-end fw-semibold">{item.amount}</span>
                            </div>
                            <p className="text-muted mb-0 mt-2">{item.desc}</p>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            <button 
                                onClick={() => {
                                    const phoneNumber = "+221776588190"; // Replace with your WhatsApp number
                                    const message = "Salut ! Je veux commander une huile Bloom & Grow. Voici mes infos :\n• Nom :\n• Adresse de livraison :\n• Quantité :";
                                    const encodedMessage = encodeURIComponent(message);
                                    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                                    window.open(whatsappURL, '_blank');
                                }}
                                className="btn btn-font-sm btn-lg btn-primary text-uppercase mt-2"
                            >
                                Order Now
                            </button>
                        </div>
                      </div>
                    );
                  })}
                   
                </div>
            </div>

            {/* <div className="container mt-100 mt-60">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="section-title text-center mb-4 pb-2">
                            <h4 className="title mb-4">Customers</h4>
                            <p className="text-muted mx-auto para-desc mb-0">Real people. Real results. Our customers share how Bloom & Grow has transformed their hair journey from stronger strands to healthier scalps.</p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-4 pt-2">
                    <div className="col-lg-9">
                        <div className="tiny-single-item">
                            <TinySlider settings={settings}>
                                {clientData.map((item,index)=>{
                                    return(
                                        <div className="tiny-slide px-md-5" key={index}>
                                            <div className="card client-testi text-center">
                                              
                                                <div className="card-body pb-0 content">
                                                    <p className="h6 fw-normal text-muted fst-italic">{item.desc}</p>
            
                                                    <div className="name mt-4">
                                                        <small className="text-uppercase h6 d-block">{item.name}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </TinySlider>
                        </div>
                    </div>
                </div>
            </div> */}
        </section>

        <section className="bg-cta position-relative" style={{backgroundImage:"url('/images/IMG_2559 copy.jpeg')", backgroundPosition:'center'}}>
            <div className="bg-overlay bg-gradient-overlay"></div>
            <div className="container">
                <div className="row align-items-center">                    
                    <div className="col-lg-6 col-12 mt-4 mt-lg-0 pt-2 pt-lg-0 order-lg-1 order-2">
                        <div className="section-title ms-lg-4 text-center text-lg-start">
                            <h4 className="title text-white title-dark text-uppercase mb-4">Herbs at Their Best</h4>
                            <p className="text-white-50 mb-0">If you are going to use a natural hair oil, choose one packed with fresh, potent herbs. Ours is crafted to bring your roots to life and your strands to strength — with every drop.</p>
                            <div className="mt-4">
                                <Link href="#" className="btn btn-font-sm btn-lg btn-light text-uppercase mt-2">Learn More</Link>
                            </div>
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

                            <p className="text-muted">I’ve always had a deep love for my natural hair, for its strength, its texture, its story. From a young age, I started experimenting with oils and herbs, learning how to care for my afro hair and watching it thrive. Over time, it became more than a routine, it became a passion.</p>
                            
                            <p className="text-muted mb-0">I love creating, testing, crafting formulas with my own hands and seeing them come to life. Bloom & Grow was born from that passion: a love for hair, for nature, and for making something that truly helps others feel confident and cared for. </p>
                            <Image src='/images/IMG2.JPG' width={0} height={0} sizes="100vw" className="avatar avatar-medium mt-3" style={{width:'110px', height:'auto'}} alt=""/> 

                            <div className="mt-3">
                                <small className="text-uppercase fw-medium">CEO & Founder Herb&Bloom</small>
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
                                <h5 className="footer-head">Phone</h5>
                                <p className="text-muted">Contact us directly or via Whatsapp</p>
                                <Link href="tel:+221776588190" className="text-foot" style={{ color: "#e6ccb2" }}>+221 77 658 81 90</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-4 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="card border-0 text-center features feature-clean bg-transparent">
                            <div className="icons text-primary text-center mx-auto">
                            </div>
                            <div className="content mt-3">
                                <h5 className="footer-head">Email</h5>
                                <p className="text-muted">Send us an email</p>
                                <Link href="mailto:herbandbloom3@gmail.com" className="text-foot" style={{ color: "#e6ccb2" }}>herbandbloom3@gmail.com</Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-4 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="card border-0 text-center features feature-clean bg-transparent">
                            <div className="icons text-primary text-center mx-auto">
                            </div>
                            <div className="content mt-3">
                                <h5 className="footer-head">Instagram</h5>
                                <p className="text-muted">@herb_and_bloom_<br/></p>
                                <Link href="https://www.instagram.com/herb_and_bloom_?igsh=dThxNnpidXFybnl5&utm_source=qr"
                                    data-type="iframe" className="video-play-icon text-foot lightbox" style={{ color: "#e6ccb2" }}>View on Instagram</Link>
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