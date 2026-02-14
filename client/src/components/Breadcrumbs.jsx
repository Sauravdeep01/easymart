import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const Breadcrumbs = ({ category, subCategory, title, itemCount }) => {
    return (
        <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 font-medium overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
                <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>

                <FaChevronRight className="text-[10px] text-gray-300" />
                <Link to="/products" className="hover:text-orange-600 transition-colors">Clothing</Link>

                {category && (
                    <>
                        <FaChevronRight className="text-[10px] text-gray-300" />
                        <Link to={`/products?category=${category}`} className="hover:text-orange-600 transition-colors">{category}</Link>
                    </>
                )}

                {subCategory && (
                    <>
                        <FaChevronRight className="text-[10px] text-gray-300" />
                        <Link to={`/products?category=${category}&sub=${subCategory}`} className="hover:text-orange-600 transition-colors">{subCategory}</Link>
                    </>
                )}

                {title && (
                    <>
                        <FaChevronRight className="text-[10px] text-gray-300" />
                        <span className="text-gray-900 font-bold truncate">{title}</span>
                    </>
                )}
            </nav>
            {itemCount !== undefined && (
                <div className="mt-4 flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-gray-900 font-serif uppercase tracking-tight">
                        {category || 'All Products'}
                    </h1>
                    <span className="text-gray-400 text-lg font-medium"> - {itemCount} items</span>
                </div>
            )}
        </div>
    );
};

export default Breadcrumbs;
