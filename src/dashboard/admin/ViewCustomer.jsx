import React from 'react';
import useAllUser from './../../hooks/useAllUser';

const ViewCustomer = () => {
    const [alluser] = useAllUser();
    console.log(alluser)
    return (
        <div className="overflow-x-auto md:px-10 md:mt-4">
        <table className="min-w-full border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">Serial</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {alluser.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="p-3 border">
                  {index + 1}
                </td>
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default ViewCustomer;