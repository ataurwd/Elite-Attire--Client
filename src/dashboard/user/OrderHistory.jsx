import React, { useContext } from 'react';
import useAllPayment from './../../hooks/useAllPayment';
import Loading from './../../components/Loading';
import { FormContext } from './../../context/AuthContext';

const OrderHistory = () => {
  const [payment, reFetch, isLoading] = useAllPayment()
  const {user} = useContext(FormContext)
  
  if (isLoading) {
    return <Loading/>
  }


  const userData = payment.filter(item => item.userEmail || item.email == user.email)
  console.log(userData)
    return (
        <div className="overflow-x-auto md:p-5">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">User Name</th>
              <th className="border border-gray-300 px-4 py-2">Address</th>
              <th className="border border-gray-300 px-4 py-2">User Email</th>

          </tr>
        </thead>
        <tbody>
          {userData?.map((payment, index) => (
            <tr key={payment._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">${payment.amount}</td>
              <td className="border border-gray-300 px-4 py-2">{payment.userName || payment.name}</td>
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