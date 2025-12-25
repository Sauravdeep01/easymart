import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword = '', page = 1, pageSize = 12, sort = '-createdAt', category, brand, minPrice, maxPrice, minRating, inStock, bestSeller } = {}) => {
                const params = new URLSearchParams();
                if (keyword) params.append('keyword', keyword);
                params.append('page', page);
                params.append('pageSize', pageSize);
                if (sort) params.append('sort', sort);
                if (category) params.append('category', category);
                if (brand) params.append('brand', brand);
                if (minPrice !== undefined) params.append('minPrice', minPrice);
                if (maxPrice !== undefined) params.append('maxPrice', maxPrice);
                if (minRating !== undefined) params.append('minRating', minRating);
                if (inStock !== undefined) params.append('inStock', inStock);
                if (bestSeller !== undefined) params.append('bestSeller', bestSeller);
                
                return {
                    url: `${PRODUCTS_URL}?${params.toString()}`,
                };
            },
            keepUnusedDataFor: 5,
            providesTags: ['Product'],
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: (data) => ({
                url: PRODUCTS_URL,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: `/api/upload`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            }),
        }),
        createReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data.productId}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        getTopProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top/rated`,
            }),
            keepUnusedDataFor: 5,
        }),
        getBestSellers: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top/bestsellers`,
            }),
            keepUnusedDataFor: 5,
        }),
        getCategories: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/categories`,
            }),
            keepUnusedDataFor: 5,
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductDetailsQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation,
    useCreateReviewMutation,
    useGetTopProductsQuery,
    useGetBestSellersQuery,
    useGetCategoriesQuery
} = productsApiSlice;
