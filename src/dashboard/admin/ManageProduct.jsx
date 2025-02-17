import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const ManageProduct = () => {
    const { data } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
          const response = await axios.get(`${import.meta.env.VITE_URL}/products`);
          return response.data;
        },
    });
    console.log(data)
    return (
        <div className="overflow-x-auto md:p-5">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">No</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">price</th>
              <th className="p-3 border">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="p-3 border">
                 {index + 1}
                </td>
                <td className="p-3 border">{user.product_name}</td>
                <td className="p-3 border">{user.price}</td>
                <td className="p-3 border">{user.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default ManageProduct;