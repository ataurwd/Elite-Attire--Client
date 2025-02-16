import React, { useState } from 'react';
import axios from 'axios';
import useAllPayment from '../../hooks/useAllPayment';

const ManageOrder = () => {
  const [payment,setPayment, ] = useAllPayment()

  // Handle the status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Send the updated status to the backend API
      const response = await axios.patch(
        `${import.meta.env.VITE_URL}/payment/${id}`,
        { status: newStatus }
      );
      // If status update is successful, update the payment list in the state
      if (response.data.message === 'Order status updated successfully') {
        setPayment((prevPayments) =>
          prevPayments.map((order) =>
            order._id === id ? { ...order, status: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="overflow-x-auto md:p-5">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Order ID</th>
            <th className="border border-gray-300 px-4 py-2">User Name</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Update Status</th>
          </tr>
        </thead>
        <tbody>
          {payment.map((order) => (
            <tr key={order._id}>
              <td className="border border-gray-300 px-4 py-2">{order.paymentMethodId}</td>
              <td className="border border-gray-300 px-4 py-2">{order.userName}</td>
              <td className="border border-gray-300 px-4 py-2">${order.amount}</td>
              <td className="border border-gray-300 px-4 py-2">{order.address}</td>
              <td className="border border-gray-300 px-4 py-2">{order.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)} // Update status on change
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOrder;
