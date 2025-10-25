'use client'
import React,{useState} from "react";
import Link from "next/link";
import Image from "next/image";


export default function Product({item, onAddToCart, onOpenCart}){
    let [counter, setCounter] = useState(0);

    let incrementCounter = () => {
        setCounter(counter + 1);
    };

    let decrementCounter = () => {
        if (counter !== 0) {
            setCounter(counter - 1);
        }
    };

    return(
        <div className="card shop-list border-0">
            <ul className="label list-unstyled mb-0">
                {item?.tag ? <li><Link href="#" className={`${item.tagClass} badge rounded-lg`}>{item.tag}</Link></li> :''}
                
            </ul>
            <div className="shop-image position-relative overflow-hidden rounded shadow" style={{height: '300px'}}>
                <Link href={`/products/${item.id}`}>
                    <Image 
                        width={0} 
                        height={0} 
                        sizes="100vw" 
                        style={{width:'100%', height:'100%', objectFit: 'cover'}} 
                        src={item.image1} 
                        className="img-fluid product-image" 
                        alt=""
                    />
                </Link>
                <Link href={`/products/${item.id}`} className="overlay-work">
                    <Image 
                        src={item.image2} 
                        width={0} 
                        height={0} 
                        sizes="100vw" 
                        style={{width:'100%', height:'100%', objectFit: 'cover'}} 
                        className="img-fluid" 
                        alt=""
                    />
                </Link>

                {/* Out of Stock Overlay */}
                {!item.inStock && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 10}}>
                        <span className="text-white fw-bold">Out of Stock</span>
                    </div>
                )}

                                          

                <div className="qty-icons">
                    <button 
                        onClick={decrementCounter} 
                        className={`btn btn-pills btn-icon btn-primary minus ${!item.inStock ? 'disabled' : ''}`}
                        disabled={!item.inStock}
                    >-</button>
                    <input 
                        min="0" 
                        name="quantity"  
                        placeholder={counter}  
                        type="number" 
                        className={`btn btn-pills btn-icon btn-primary qty-btn quantity mx-1 ${!item.inStock ? 'disabled' : ''}`}
                        disabled={!item.inStock}
                    />
                    <button  
                        onClick={incrementCounter} 
                        className={`btn btn-pills btn-icon btn-primary plus ${!item.inStock ? 'disabled' : ''}`}
                        disabled={!item.inStock}
                    >+</button>
                    <button 
                        onClick={() => {
                            if (counter > 0 && item.inStock && onAddToCart) {
                                const cartItem = {
                                    id: item.id,
                                    product: item.product,
                                    size: item.sizes ? item.sizes[0] : 'Standard', // Use actual product size
                                    format: undefined, // No format for simple products
                                    price: parseFloat(item.amount.replace(/[^0-9]/g, '')),
                                    quantity: counter,
                                    image: item.image1
                                };
                                
                                // Add the selected quantity to cart
                                onAddToCart(cartItem);
                                
                                // Reset counter after adding to cart
                                setCounter(0);
                            }
                        }}
                        className={`btn btn-pills btn-icon btn-success ms-2 ${!item.inStock || counter === 0 ? 'disabled' : ''}`}
                        disabled={!item.inStock || counter === 0}
                        title="Add to Cart"
                    >
                        <i className="mdi mdi-cart-plus"></i>
                    </button>
                </div>
            </div>
            <div className="card-body content pt-4 p-2">
                <Link href={`/products/${item.id}`} className="text-dark product-name h6">{item.product}</Link>
                <div className="d-flex justify-content-between mt-1">
                    <h6 className="text-muted small font-italic mb-0 mt-1">{item.amount} </h6>
                    <div className="d-flex align-items-center">
                        <ul className="list-unstyled text-warning mb-0 me-2">
                            {[...Array(5)].map((_, index) => (
                                <li key={index} className="list-inline-item">
                                    <i className={`mdi ${index < Math.floor(item.rating || 0) ? 'mdi-star' : 'mdi-star-outline'}`}></i>
                                </li>
                            ))}
                        </ul>
                        <span className="text-muted small">({item.rating || 0})</span>
                    </div>
                </div>
                {/* Stock Status */}
                <div className="mt-2">
                    {item.inStock ? (
                        <span className="text-success small">
                            <i className="mdi mdi-check-circle me-1"></i>
                            In Stock
                        </span>
                    ) : (
                        <span className="text-danger small">
                            <i className="mdi mdi-close-circle me-1"></i>
                            Out of Stock
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
