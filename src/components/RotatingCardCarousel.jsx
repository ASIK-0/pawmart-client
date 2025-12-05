import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router";

const RotatingCardCarousel = ({ products = [] }) => {
    const mobileScrollRef = useRef(null);

    const intervalRef = useRef(null);

    useEffect(() => {
        const scrollContainer = mobileScrollRef.current;
        if (!scrollContainer) return;

        let scrollAmount = 0;
        const scrollSpeed = 0.5;

        const autoScroll = () => {
            scrollAmount += scrollSpeed;
            if (scrollAmount >= scrollContainer.scrollWidth / 2) {
                scrollAmount = 0;
            }
            scrollContainer.scrollLeft = scrollAmount;
        };

        intervalRef.current = setInterval(autoScroll, 16); 

        const handleMouseEnter = () => clearInterval(intervalRef.current); 
        const handleMouseLeave = () => {
            intervalRef.current = setInterval(autoScroll, 16); 
        };

        scrollContainer.addEventListener("mouseenter", handleMouseEnter);
        scrollContainer.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            clearInterval(intervalRef.current);
            scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
            scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);


    const items = products.length > 0 ? products : Array(8).fill(null);
    const duplicatedItems = [...items, ...items];

    return (
        <StyledWrapper>
            <div className="desktop-view">
                <div className="wrapper">
                    <div className="inner" quantity={items.length}>
                        {items.map((product, index) => (
                            <Link
                                key={product?._id || index}
                                to={product ? `/listingDetails/${product?._id}` : "#"}
                                className="card"
                                style={{ "--index": index }}
                            >
                                <div
                                    className="img"
                                    style={{
                                        backgroundImage: product
                                            ? `url(${product.image})`
                                            : `ur[](https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600)`,
                                    }}
                                >
                                    {product && (
                                        <div className="overlay">
                                            <h3 className="name">{product.name}</h3>
                                            <p className="price">
                                                {product.Price === 0 ? "Free Adoption" : `Price : ${product.Price}`}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mobile-view" ref={mobileScrollRef}>
                <div className="mobile-scroll">
                    {duplicatedItems.map((product, index) => (
                        <Link
                            key={`${product?._id || "dummy"}-${index}`}
                            to={product ? `/listingDetails/${product?._id}` : "#"}
                            className="mobile-card"
                        >
                            <div
                                className="mobile-img"
                                style={{
                                    backgroundImage: product
                                        ? `url(${product.image})`
                                        : `ur[](https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600)`,
                                }}
                            />
                            <div className="mobile-info">
                                <h3 className="mobile-name">{product?.name || "Beautiful Pet"}</h3>
                                <p className="mobile-price">
                                    {product?.price === 0 ? "Free Adoption" : `৳${product?.price || "1200"}`}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  padding:0px;
  border-radius: 24px;
  margin: 40px 0;

  /* Desktop 3D View */
  .desktop-view {
    display: block;
    @media (max-width: 768px) { display: none; }
  }

  .wrapper {
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inner {
    --w: 150px;
    --h: 220px;
    --quantity: ${({ quantity }) => quantity || 6};
    --translateZ: calc(var(--w) * 2.8);
    --rotateX: -18deg;
    --perspective: 1400px;
    width: var(--w);
    height: var(--h);
    transform-style: preserve-3d;
    transform: perspective(var(--perspective)) rotateX(var(--rotateX));
    animation: spin 35s linear infinite;
  }

  @keyframes spin {
    to { transform: perspective(1400px) rotateX(-18deg) rotateY(360deg); }
  }

  .card {
    position: absolute;
    inset: 0;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    transform: rotateY(calc(360deg / var(--quantity) * var(--index))) translateZ(var(--translateZ));
    border: 5px solid rgba(255,255,255,0.4);
    transition: all 0.4s ease;
  }

  .card:hover {
    transform: rotateY(calc(360deg / var(--quantity) * var(--index))) 
               translateZ(calc(var(--translateZ) + 20px)) scale(1.1) !important;
    box-shadow: 0 30px 80px rgba(0,0,0,0.6);
  }

  .img {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.9));
    padding: 40px 15px 15px;
    text-align: center;
    color: white;
  }

  .name { font-size: 16px; font-weight: bold; margin: 0; text-shadow: 0 3px 10px black; }
  .price { margin: 8px 0 0; font-size: 14px; }

  /* Mobile Auto Scroll View */
  .mobile-view {
    display: none;
    overflow: hidden;
    @media (max-width: 768px) {
      display: block;
    }
  }

  .mobile-scroll {
    display: flex;
    gap: 20px;
    padding: 10px 0;
    width: max-content;
  }

  .mobile-card {
    flex: 0 0 280px;
    height: 380px;
    border-radius: 0 24px 24px 24px;
    
    box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    background: white;
    transition: transform 0.3s ease;
  }

  .mobile-card:hover {
    transform: translateY(-10px);
  }

  .mobile-img {
    width: 100%;
    height: 70%;
    background-size: cover;
    background-position: center;
  }

  .mobile-info {
    padding: 18px;
    text-align: center;
  }

  .mobile-name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin: 0 0 8px;
  }

  .mobile-price {
    font-size: 18px;
    color: #e91e63;
    font-weight: bold;
  }
`;

export default RotatingCardCarousel;