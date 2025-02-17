import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    // Get the product ID from the URL
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        productName: '',
        category: '',
        material: '',
        price: '',
        description: '',
        quantity: '',
        image: '',
    });
    const [imageFile, setImageFile] = useState(null); // State for image file

    useEffect(() => {
        // Fetch the product data for the given ID when the component mounts
        axios.get(`http://localhost:5000/products/${id}`)
            .then(response => {
                setProductData(response.data);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = productData.image;

        // Upload image if a new one is selected
        if (imageFile) {
            const formData = new FormData();
            formData.append('image', imageFile);

            try {
                const response = await axios.post(`https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMAGEBB_API
        }`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                imageUrl = response.data.data.url; 
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        // Now, update the product with the image URL
        axios.put(`http://localhost:5000/products/${id}`, { ...productData, image: imageUrl })
            .then(response => {
                console.log('Product updated:', response.data);
                navigate('//dashboard/manage-product');  
            })
            .catch(error => {
                console.error('Error updating product:', error);
            });
    };

    return (
        <div className="max-w-2xl mx-auto p-5">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Product Name</label>
                    <input 
                        type="text" 
                        name="productName" 
                        value={productData.productName} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded-md" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Category</label>
                    <input 
                        type="text" 
                        name="category" 
                        value={productData.category} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded-md" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Material</label>
                    <input 
                        type="text" 
                        name="material" 
                        value={productData.material} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded-md" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Price</label>
                    <input 
                        type="number" 
                        name="price" 
                        value={productData.price} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded-md" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea 
                        name="description" 
                        value={productData.description} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded-md" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Quantity</label>
                    <input 
                        type="number" 
                        name="quantity" 
                        value={productData.quantity} 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded-md" 
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Current Image</label>
                    <div className="mb-2">
                        {productData.image ? (
                            <img src={productData.image} alt="Product" className="w-32 h-32 object-cover" />
                        ) : (
                            <p>No image available</p>
                        )}
                    </div>
                    <label className="block text-sm font-medium">Upload New Image</label>
                    <input 
                        type="file" 
                        onChange={handleImageChange} 
                        className="w-full p-2 border rounded-md" 
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
