import React, { useState } from "react";
import EmptyState from "../../../components/EmptyState.jsx";

const OrderTable = ({ orders }) => {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const toggleRow = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {!orders.length ? (<EmptyState title={`No orders found`} message={`Orders coming soon`} />) : (<table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Buyer
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Highest Bid
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
        {orders.map((order) => (
            <React.Fragment key={order._id}>
              {/* Main Row */}
              <tr
                  className="cursor-pointer"
                  onClick={() => toggleRow(order._id)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {order.buyer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  GHS {order?.auction?.highestBid?.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click when clicking the button
                        toggleRow(order._id);
                      }}
                  >
                    {expandedRowId === order._id ? "Collapse" : "Expand"}
                  </button>
                </td>
              </tr>

              {/* Expanded Row */}
              {expandedRowId === order._id && (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 bg-gray-50">
                      <div className="space-y-2">
                        <p>
                          <strong>Shipping Address:</strong>{" "}
                          {order?.shipping?.address}, {order?.shipping?.city},{" "}
                          {order?.shipping?.postalCode}
                        </p>
                        <p>
                          <strong>Contact Number:</strong>{" "}
                          {order?.shipping?.contactNumber}
                        </p>
                        <p>
                          <strong>Shipping Name:</strong> {order?.shipping?.name}
                        </p>
                      </div>
                    </td>
                  </tr>
              )}
            </React.Fragment>
        ))}
        </tbody>
      </table>)}
    </div>
  );
};

export default OrderTable;
