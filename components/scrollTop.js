'use client'
import React,{useState} from "react";
import Link from "next/link";
import Image from "next/image";

export default function ScrollTop(){
    let [visible, setVisible] = useState(false) 

    let toggleVisible = () => { 
        let scrolled = document.documentElement.scrollTop; 
        if (scrolled > 300){ 
          setVisible(true) 
        }  
        else if (scrolled <= 300){ 
          setVisible(false) 
        } 
      }; 
      let scrollToTop = () =>{ 
        window.scrollTo({ 
          top: 0,  
          behavior: 'smooth'
        }); 
      };
      if (typeof window !== "undefined") {
         window.addEventListener('scroll', toggleVisible); 
      }
  
    return(
        <>
        <Link href="#" id="back-to-top" className="back-to-top rounded-pill fs-5" onClick={scrollToTop} style={{display: visible ? 'block' : 'none'}}> <Image src="/images/up.png" width={20} height={20} alt="scrolltop" /></Link>
        </>
    )
}