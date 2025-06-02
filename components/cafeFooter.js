'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function CafeFooter(){
    return(
        <>
        <footer className="footer" style={{ backgroundColor: "#6b4f27" }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="footer-py-60">
                            <div className="row justify-content-center">
                                <div className="col-12 text-center">
                                    <div className="title-heading">
                                        <span className="display-4 fw-medium text-white title-dark d-block" style={{ color: "#f5f5dc" }}>Opening Hours (Online orders only)</span>
                                    </div>

                                    <div className="content mt-4 pt-3">
                                        <p className="mb-2 h6" style={{ color: "#e5decf" }}>Location: Dakar, Senegal</p>
                                        <p className="mb-2 h6" style={{ color: "#e5decf" }}>MONDAY - FRIDAY: 10AM - 6PM</p>
                                        <p className="mb-2 h6" style={{ color: "#e5decf" }}>SATURDAY - SUNDAY: 10AM - 4PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-py-30 footer-bar" style={{ backgroundColor: "#6b4f27" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-sm-6">
                            <div className="text-sm-start text-center">
                                <p className="mb-0" style={{ color: "#e5decf" }}>{new Date().getFullYear()} © Herb & Bloom. Made with care and <i className="mdi mdi-heart text-danger"></i> in Senegal.</p>
                            </div>
                        </div>

                        <div className="col-sm-6 mt-3 mt-sm-0">
                            <ul className="list-unstyled text-sm-end text-center social-icon foot-social-icon mb-0">
                                <li className="list-inline-item">
                                    <Link href="https://www.instagram.com/herb_and_bloom_?igsh=dThxNnpidXFybnl5&utm_source=qr" target="_blank" className="rounded">
                                        <Image src="/images/instagram.png" width={20} height={20} alt="Instagram" />
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link href="https://www.tiktok.com/@herbandbloom?_t=ZM-8wqm60v6lUb&_r=1" target="_blank" className="rounded">
                                        <Image src="/images/tiktok.svg" width={20} height={20} alt="Tiktok" />
                                    </Link>
                                </li>
                                <li className="list-inline-item">
                                    <Link href="https://snapchat.com/t/OIJQsSmA" target="_blank" className="rounded">
                                        <Image src="/images/snapchat.svg" width={20} height={20} alt="Snapchat" />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}