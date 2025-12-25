import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice';

const ProductListScreen = () => {
    const { pageNumber } = useParams();
    const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber });

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted');
                refetch();
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    const createProductHandler = async () => {
        if (window.confirm('Create a new product?')) {
            try {
                await createProduct();
                refetch();
                toast.success('Product created');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
                <button
                    onClick={createProductHandler}
                    className="bg-primary-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-primary-700 transition"
                >
                    <FaPlus /> Create Product
                </button>
            </div>

            {loadingCreate && <div>Creating...</div>}
            {loadingDelete && <div>Deleting...</div>}

            {isLoading ? <div>Loading...</div> : error ? <div className="text-red-500">{error?.data?.message || error.error}</div> : (
                <div className="overflow-x-auto bg-white rounded shadow-sm">
                    <table className="min-w-full text-left">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="py-3 px-4">ID</th>
                                <th className="py-3 px-4">NAME</th>
                                <th className="py-3 px-4">PRICE</th>
                                <th className="py-3 px-4">CATEGORY</th>
                                <th className="py-3 px-4">BRAND</th>
                                <th className="py-3 px-4">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map((product) => (
                                <tr key={product._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="py-3 px-4 text-sm">{product._id}</td>
                                    <td className="py-3 px-4 font-medium text-gray-800">{product.name}</td>
                                    <td className="py-3 px-4">${product.price}</td>
                                    <td className="py-3 px-4">{product.category}</td>
                                    <td className="py-3 px-4">{product.brand}</td>
                                    <td className="py-3 px-4 flex gap-3">
                                        <Link to={`/admin/product/${product._id}/edit`} className="text-blue-600 hover:text-blue-800">
                                            <FaEdit />
                                        </Link>
                                        <button
                                            onClick={() => deleteHandler(product._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProductListScreen;
