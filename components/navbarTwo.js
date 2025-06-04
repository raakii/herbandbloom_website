'use client'
import React,{useState,useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import { useTranslations } from "../src/app/hooks/useTranslations";
import LanguageToggle from "../src/app/components/LanguageToggle";

export default function NavbarTwo({navClass,manuClass,navDark}){
    let [scroll, setScroll] = useState(false);
    let [isMenu, setisMenu] = useState(false);

    let [manu , setManu] = useState('');
    let pathname = usePathname();
    const translations = useTranslations();

    useEffect(() => {
        setManu(pathname)
        function scrollHandler() {
            setScroll(window.scrollY > 50)
          }
          if (typeof window !== "undefined") {
            window.addEventListener('scroll', scrollHandler);
            window.scrollTo(0, 0);
          }
          return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
      }, [setManu]);

     
        // Toggle menu
        const toggleMenu = () => {
            setisMenu(!isMenu);
            if (document.getElementById("navigation")) {
                const anchorArray = Array.from(document.getElementById("navigation").getElementsByTagName("a"));
                anchorArray.forEach(element => {
                    element.addEventListener('click', (elem) => {
                        const target = elem.target.getAttribute("href")
                        if (target !== "") {
                            if (elem.target.nextElementSibling) {
                                var submenu = elem.target.nextElementSibling.nextElementSibling;
                                submenu.classList.toggle('open');
                            }
                        }
                    })
                });
            }
        };


    return(
        <>
         <header id="topnav" className={`${scroll ? "nav-sticky" :""} ${navClass}`}>
            <div className="container">
                {navDark === true ?  
                <Link className="logo" href="/">
                    <Image src='/images/logo.png' width={110} height={30} className="logo-light-mode" alt=""/>
                    <Image src='/images/logo.png' width={110} height={30} className="logo-dark-mode" alt=""/>
                </Link> :
                <Link className="logo" href="/">
                    <span className="logo-light-mode">
                        <Image src='/images/logo.png' width={110} height={110} className="l-dark" alt=""/>
                        <Image src='/images/logo.png' width={110} height={110} className="l-light" alt=""/>
                    </span>
                    <Image src='/images/logo.png' width={110} height={30} className="logo-dark-mode" alt=""/>
                </Link>
                }
                <div className="menu-extras">
                    <div className="menu-item d-flex align-items-center">
                        <LanguageToggle />
                        <Link href="#" className={`navbar-toggle ${isMenu ? 'open' : ''}`} id="isToggle" onClick={() => toggleMenu()}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    </div>
                </div>

                
                <div id="navigation" style={{ display: isMenu ? 'block' : 'none' }}>
                    <ul className={manuClass}>
                        <li className="/index-business">
                            <Link href="#about">{translations.navbar_about}</Link><span className="menu-arrow"></span>
                        </li>

                        <li ><Link href="#contact" className="sub-menu-item">{translations.navbar_contact}</Link></li>
                    </ul>
                </div>
            </div>
        </header>
        </>
    )
}