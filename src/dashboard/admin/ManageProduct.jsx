import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../components/Loading";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageProduct = () => {
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_URL}/products`);
      return response.data;
    },
  });

  console.log(data);
  if (isLoading) {
    return <Loading />;
  }
  // to delete single product

  const handelDelete = async (id) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_URL}/products/${id}`
    );

    if (response.data.deletedCount === 1) {
      Swal.fire({
        title: "Deleted!",
        text: "Your Product has been deleted.",
        icon: "success",
      });
      refetch();
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((product, index) => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-between items-center">
              <img
                src={product.image_url || product.image}
                alt=""
                className="h-72 object-cover w-full"
              />
            </div>
            <h3 className="text-lg font-bold mt-3">
              {product.product_name || product.productName}
            </h3>
            <p className="text-gray-600 mt-1">
              Price: <span className="font-semibold">${product.price}</span>
            </p>
            <Link to={`/dashboard/manage-product/update/${product._id}`} className="btn mr-2 mt-2 bg-primary text-white">
              Update
            </Link>
            <button
              onClick={() => handelDelete(product._id)}
              className="btn mr-2 mt-2 bg-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
