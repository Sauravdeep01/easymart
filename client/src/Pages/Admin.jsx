import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { products, setProducts, addCustomProduct, updateProduct, removeProduct, userData } = useContext(ShopContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData || !userData.isAdmin) {
            toast.error("Access Denied. Admins only.");
            navigate('/login');
        }
    }, [userData, navigate]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Men',
        subCategory: 'Topwear',
        itemType: '',
        price: '',
        originalPrice: '',
        image: '',
        badge: ''
    });

    const [activeTab, setActiveTab] = useState('add');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEdit = (product) => {
        // Parse numbers from strings like "Rs. 1,499"
        const cleanPrice = product.price ? product.price.replace(/[^0-9]/g, '') : '';
        const cleanOriginalPrice = product.originalPrice ? product.originalPrice.replace(/[^0-9]/g, '') : '';

        setFormData({
            title: product.title,
            category: product.category,
            subCategory: product.subCategory,
            itemType: product.itemType,
            price: cleanPrice,
            originalPrice: cleanOriginalPrice,
            image: product.image,
            badge: product.badge || ''
        });
        setEditingId(product.id);
        setActiveTab('add');
        window.scrollTo(0, 0);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({
            title: '',
            category: 'Men',
            subCategory: 'Topwear',
            itemType: '',
            price: '',
            originalPrice: '',
            image: '',
            badge: ''
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await removeProduct(id);
            toast.success("Product deleted successfully");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.price || !formData.image) {
            toast.error("Please fill all required fields");
            return;
        }

        const productData = {
            ...formData,
            price: `Rs. ${parseInt(formData.price).toLocaleString()}`,
            originalPrice: formData.originalPrice ? `Rs. ${parseInt(formData.originalPrice).toLocaleString()}` : null
        };

        if (editingId) {
            await updateProduct(editingId, productData);
            toast.success("Product updated successfully!");
            setEditingId(null);
        } else {
            const newProduct = {
                id: `p-${Date.now()}`,
                ...productData
            };
            await addCustomProduct(newProduct);
            toast.success("Product added successfully!");
        }

        setFormData({
            title: '',
            category: 'Men',
            subCategory: 'Topwear',
            itemType: '',
            price: '',
            originalPrice: '',
            image: '',
            badge: ''
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-1">Manage your store products and categories</p>
                    </div>
                    <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
                        <button
                            onClick={() => { setActiveTab('add'); if (!editingId) handleCancelEdit(); }}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'add' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}
                        >
                            {editingId ? "Editing Product" : "Add Product"}
                        </button>
                        <button
                            onClick={() => setActiveTab('inventory')}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'inventory' ? 'bg-black text-white' : 'text-gray-500 hover:text-black'}`}
                        >
                            Inventory ({products.length})
                        </button>
                    </div>
                </div>

                {activeTab === 'add' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form Section */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
                                    {editingId ? "Update Product" : "Product Details"}
                                </h2>
                                {editingId && (
                                    <button onClick={handleCancelEdit} className="text-gray-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest">
                                        Cancel Edit
                                    </button>
                                )}
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Title *</label>
                                        <input
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Ex: Premium Leather Jacket"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Item Type (Sub-menu)</label>
                                        <input
                                            name="itemType"
                                            value={formData.itemType}
                                            onChange={handleInputChange}
                                            placeholder="Ex: Jackets"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Main Category</label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all font-medium appearance-none bg-white"
                                        >
                                            <option>Men</option>
                                            <option>Women</option>
                                            <option>Kids</option>
                                            <option>Electronics</option>
                                            <option>Beauty</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sub Category</label>
                                        <input
                                            name="subCategory"
                                            value={formData.subCategory}
                                            onChange={handleInputChange}
                                            placeholder="Ex: Topwear"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Price (Rs) *</label>
                                        <input
                                            name="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            placeholder="1499"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Original Price (Mock Sale)</label>
                                        <input
                                            name="originalPrice"
                                            type="number"
                                            value={formData.originalPrice}
                                            onChange={handleInputChange}
                                            placeholder="2999"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Image URL (Unsplash recommended) *</label>
                                        <input
                                            name="image"
                                            value={formData.image}
                                            onChange={handleInputChange}
                                            placeholder="https://images.unsplash.com/photo-..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Badge</label>
                                        <select
                                            name="badge"
                                            value={formData.badge}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all font-medium appearance-none bg-white"
                                        >
                                            <option value="">None</option>
                                            <option>NEW</option>
                                            <option>HOT</option>
                                            <option>SALE</option>
                                            <option>EXCLUSIVE</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-black/20 ${editingId ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-black hover:bg-gray-900 text-white'}`}
                                >
                                    {editingId ? "Update Product" : "Publish Product"}
                                </button>
                            </form>
                        </div>

                        {/* Preview Section ... (omitted preview for space, assuming it remains same) */}
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <span className="w-2 h-6 bg-orange-500 rounded-full"></span>
                                Live Preview
                            </h2>
                            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 overflow-hidden group">
                                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 relative mb-4">
                                    {formData.image ? (
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-300 flex-col gap-2">
                                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            <p className="text-xs font-bold uppercase tracking-widest">Image Preview</p>
                                        </div>
                                    )}
                                    {formData.badge && (
                                        <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-tighter">
                                            {formData.badge}
                                        </div>
                                    )}
                                </div>
                                <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">{formData.subCategory || "Subcategory"}</p>
                                <h3 className="font-bold text-gray-900 line-clamp-1">{formData.title || "Tuxedo Signature Series"}</h3>
                                <div className="flex items-center gap-3 mt-2">
                                    <p className="font-bold text-lg">Rs. {formData.price ? parseInt(formData.price).toLocaleString() : "0"}</p>
                                    {formData.originalPrice && (
                                        <p className="text-sm text-gray-400 line-through">Rs. {parseInt(formData.originalPrice).toLocaleString()}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-gray-100">
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Price</th>
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                                        <th className="pb-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {products.slice(0, 50).map(product => (
                                        <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4">
                                                <div className="flex items-center gap-4">
                                                    <img src={product.image} className="w-12 h-16 object-cover rounded-lg shadow-sm" alt="" />
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-sm line-clamp-1">{product.title}</p>
                                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{product.itemType}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 font-bold text-sm text-gray-900">{product.price}</td>
                                            <td className="py-4">
                                                <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-600">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="py-4 text-right space-x-4">
                                                <button onClick={() => handleEdit(product)} className="text-orange-600 hover:text-orange-800 font-bold text-xs uppercase transition-colors">Edit</button>
                                                <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 font-bold text-xs uppercase transition-colors">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
