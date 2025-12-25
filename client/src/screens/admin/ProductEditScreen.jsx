import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FaArrowLeft } from 'react-icons/fa';
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
    }, [product]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateProduct({
                productId,
                name,
                price,
                image,
                brand,
                category,
                description,
                countInStock
            }).unwrap();
            toast.success('Product updated');
            navigate('/admin/productlist');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container mx-auto mt-10 max-w-2xl">
            <Link to="/admin/productlist" className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition">
                <FaArrowLeft className="mr-2" /> Go Back
            </Link>
            <h1 className="text-3xl font-bold mb-6">Edit Product</h1>
            {isLoading ? <div>Loading...</div> : error ? <div className="text-red-500">{error?.data?.message || error.error}</div> : (
                <form onSubmit={submitHandler} className="bg-white p-8 rounded shadow-sm">
                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            className="w-full px-3 py-2 border rounded shadow-sm outline-none focus:ring-2 focus:ring-primary-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Price</label>
                        <input
                            type="number"
                            placeholder="Enter price"
                            className="w-full px-3 py-2 border rounded shadow-sm outline-none focus:ring-2 focus:ring-primary-500"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    {/* Image */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Image</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Enter image url"
                                className="w-full px-3 py-2 border rounded shadow-sm outline-none focus:ring-2 focus:ring-primary-500 mb-2"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <input
                                type="file"
                                className="border rounded p-1"
                                onChange={uploadFileHandler}
                            />
                        </div>
                        {loadingUpload && <div>Uploading...</div>}
                    </div>

                    {/* Brand */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Brand</label>
                        <input
                            type="text"
                            placeholder="Enter brand"
                            className="w-full px-3 py-2 border rounded shadow-sm outline-none focus:ring-2 focus:ring-primary-500"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>

                    {/* Count In Stock */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Count In Stock</label>
                        <input
                            type="number"
                            placeholder="Enter countInStock"
                            className="w-full px-3 py-2 border rounded shadow-sm outline-none focus:ring-2 focus:ring-primary-500"
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Category</label>
                        <input
                            type="text"
                            placeholder="Enter category"
                            className="w-full px-3 py-2 border rounded shadow-sm outline-none focus:ring-2 focus:ring-primary-500"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea
                            placeholder="Enter description"
                            className="w-full px-3 py-2 border rounded shadow-sm outline-none focus:ring-2 focus:ring-primary-500 h-32"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary-600 text-white font-bold py-2 px-4 rounded hover:bg-primary-700 transition"
                        disabled={loadingUpdate}
                    >
                        {loadingUpdate ? 'Updating...' : 'Update'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default ProductEditScreen;
