import React, { useState } from "react";

const UserTable = ({ users }) => {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const toggleRow = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Verified
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Admin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <React.Fragment key={user._id}>
              {/* Main Row */}
              <tr
                className={`cursor-pointer ${
                  !user.verified && !user.isAdmin
                    ? "bg-yellow-500/5"
                    : user.verified && user.isAdmin
                    ? "bg-green-500/50"
                    : user.verified
                    ? "bg-blue-500/5"
                    : "bg-red-500/5"
                }`}
                onClick={() => toggleRow(user._id)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.verified ? (
                    <span className="text-green-500 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-500 font-semibold">No</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.isAdmin ? (
                    <span className="text-green-500 font-semibold">Yes</span>
                  ) : (
                    <span className="text-red-500 font-semibold">No</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click when clicking the button
                      toggleRow(user._id);
                    }}
                  >
                    {expandedRowId === user._id ? "Collapse" : "Expand"}
                  </button>
                </td>
              </tr>

              {/* Expanded Row */}
              {expandedRowId === user._id && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 bg-gray-50">
                    <div className="space-y-2">
                      <p>
                        <strong>Phone Number:</strong>{" "}
                        {user.phoneNumber || "N/A"}
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        {user.address || "N/A"}
                      </p>
                      <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;