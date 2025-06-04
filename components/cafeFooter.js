'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "../src/app/hooks/useTranslations";

export default function CafeFooter(){
    const translations = useTranslations();
    const year = new Date().getFullYear();
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
                                        <style jsx>{`
                                            @import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap');
                                            .kaushan-font {
                                                font-family: 'Kaushan Script', cursive;
                                            }
                                        `}</style>
                                        <span className="display-4 fw-medium text-white title-dark d-block kaushan-font" style={{ color: "#f5f5dc" }}>{translations.footer_opening_hours}</span>
                                    </div>

                                    <div className="content mt-4 pt-3">
                                        <p className="mb-2 h6" style={{ color: "#e5decf" }}>{translations.footer_location}</p>
                                        <p className="mb-2 h6" style={{ color: "#e5decf" }}>{translations.footer_weekdays}</p>
                                        <p className="mb-2 h6" style={{ color: "#e5decf" }}>{translations.footer_weekends}</p>
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
                                <p className="mb-0" style={{ color: "#e5decf" }} dangerouslySetInnerHTML={{ __html: translations.footer_copyright(year) }} />
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