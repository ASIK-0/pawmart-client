import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        arrows: false,
        appendDots: (dots) => (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <ul className="flex gap-2"> {dots} </ul>
            </div>
        ),
        customPaging: () => (
            <div className="w-3 h-3 bg-white/40 rounded-full hover:bg-pink-500 transition-all duration-300"></div>
        ),
    };

    const slides = [
        {
            title: "Find Your Furry Friend Today!",
            subtitle: "Fur Babies Waiting for You",
            description: "Because Every Pet Deserves Love and Care",
            image: "https://i.pinimg.com/1200x/5f/b3/de/5fb3deaa5848d918aa0413f9cb54a56b.jpg",
        },
        {
            title: "Give a Pet a Second Chance, Be Their Hero",
            subtitle: "Hundreds of adorable pets are waiting for you",
            description: "Join thousands of happy pet parents",
            image: "https://i.pinimg.com/736x/b8/83/25/b8832573d2a9f6ff81dae19d02be422d.jpg",
        },
        {
            title: "One Adoption Changes Two Lives",
            subtitle: "Adopt and change two lives yours and theirs",
            description: "Start your journey with PawMart today",
            image: "https://i.pinimg.com/1200x/70/ff/9b/70ff9beb5f0d37e6822d4868a9eaf247.jpg",
        },
    ];

    return (
        <div className="w-11/12 mx-auto py-8 md:py-12 lg:py-16">
            <div className="relative rounded-3xl overflow-hidden shadow-sm bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
                                <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-2 md:px-12 lg:px-16 py-4 md:py-10">
                                    <div>
                                        <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                                            {slide.title}
                                        </h1>
                                        <p className="mt-4 text-sm md:text-2xl font-semibold text-pink-700">
                                            {slide.subtitle}
                                        </p>
                                        <p className="mt-3 text-sm text-gray-600 max-w-md">
                                            {slide.description}
                                        </p>
                                    </div>

                                    <div className="mt-8">
                                        <Link
                                            to="/pets-supplies"
                                            className="inline-block px-3 py-3 md:px-8 md:py-4 my-btn font-bold md:text-lg rounded-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <button>Explore More</button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center px-2 py-4 lg:p-12">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-pink-300 rounded-full blur-3xl opacity-30 scale-125 -z-10"></div>
                                        <img
                                            src={slide.image}
                                            alt="Happy pet owner"
                                            className="w-full  h-[250px] md:h-[420px] lg:h-[500px] object-cover border-8
                                            border-pink-200/50 rounded-4xl drop-shadow-2xl"
                                        />
                                    </div>
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