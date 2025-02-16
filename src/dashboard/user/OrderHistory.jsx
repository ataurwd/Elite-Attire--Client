import React from 'react';
import useAllPayment from './../../hooks/useAllPayment';

const OrderHistory = () => {
    const [payment] = useAllPayment()
    return (
        <div className="overflow-x-auto md:p-5">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Payment Method ID</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">User Name</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">User Email</th>

          </tr>
        </thead>
        <tbody>
          {payment.map((payment) => (
            <tr key={payment._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{payment.paymentMethodId}</td>
              <td className="border border-gray-300 px-4 py-2">${payment.amount}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.userName}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.address}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default OrderHistory;