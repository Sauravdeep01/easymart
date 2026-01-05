import React from 'react';
import { heroSlides } from '../constants';
import Navbar from '../components/Navbar';
import FeaturedProducts from '../components/FeaturedProducts';
import ShopByCategory from '../components/ShopByCategory';
import HeroSection from '../components/HeroSection';
import CollectionBanner from '../components/CollectionBanner';
import Footer from '../components/Footer';

const Homepage = () => {
    return (
        <div style={{fontFamily: 'sans-serif', color: '#1f2937', backgroundColor: '#ffffff', minHeight: '100vh'}}>
            {/* Navbar */}
            <Navbar />

            {/* Hero Section Carousel */}
            <HeroSection />

            {/* Featured Products */}
            <FeaturedProducts />

            <CollectionBanner />

            <ShopByCategory />

            <Footer />
        </div>
    );
};

export default Homepage;
