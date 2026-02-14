import React from 'react';
import FeaturedProducts from '../components/FeaturedProducts';
import ShopByCategory from '../components/ShopByCategory';
import HeroSection from '../components/HeroSection';
import CollectionBanner from '../components/CollectionBanner';

const Homepage = () => {
    return (
        <div style={{ fontFamily: 'sans-serif', color: '#1f2937', backgroundColor: '#ffffff', minHeight: '100vh' }}>
            {/* Hero Section Carousel */}
            <HeroSection />

            {/* Featured Products */}
            <FeaturedProducts />

            <CollectionBanner />

            <ShopByCategory />
        </div>
    );
};

export default Homepage;
