import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        arrows: false,
        fade: true,
        cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
        appendDots: (dots) => (
            <div className="pb-6">
                <ul className="flex justify-center gap-3"> {dots} </ul>
            </div>
        ),
        customPaging: () => (
            <div className="w-2 h-2 bg-white/50 rounded-full hover:bg-pink-400 transition-all duration-300"></div>
        ),
    };

    const slides = [
        {
            img: "https://images.pexels.com/photos/45170/kittens-cat-cat-puppy-rush-45170.jpeg",
            title: "Find Your Furry Friend Today!",
            subtitle: "Browse hundreds of adorable pets waiting for their forever home",
        },
        {
            img: "https://images.pexels.com/photos/8473661/pexels-photo-8473661.jpeg",
            title: "Adopt, Don’t Shop — Give a Pet a Home.",
            subtitle: "Every adoption saves a life and brings endless joy",
        },
        {
            img: "https://images.pexels.com/photos/332974/pexels-photo-332974.jpeg",
            title: "Because Every Pet Deserves Love and Care.",
            subtitle: "Join our community of loving pet parents",
        },
    ];

    return (
        <div className="w-full max-w-full px-4 py-8 md:py-12">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl 
              h-[280px] sm:h-[380px] md:h-[520px] lg:h-[580px]
              bg-gradient-to-br from-pink-50 to-rose-50">

                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div key={index} className="relative h-[280px] sm:h-[380px] md:h-[520px] lg:h-[580px]">
                            <div
                                className="absolute bg-cover inset-0 bg-no-repeat"
                                style={{ backgroundImage: `url(${slide.img})` }}
                            >
                                <div className="absolute inset-0 bg-black/40 md:bg-black/40 bg-black/20"></div>
                            </div>
                            <div className="relative h-full flex flex-col justify-center items-center px-6 md:px-16 text-center">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white drop-shadow-2xl leading-tight">
                                    {slide.title}
                                </h1>
                                <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-pink-100 max-w-2xl">
                                    {slide.subtitle}
                                </p>
                                <div className="mt-8">
                                    <Link to={'/pets-supplies'}
                                        className="inline-block px-5 py-2 md:px-8 md:py-4 my-btn font-bold text-base sm:text-lg rounded-2xl shadow-2xl"
                                    >
                                        Explore Pets Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Banner;