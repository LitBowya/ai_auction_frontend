import React, { useState } from "react";
import EmptyState from "../../../components/EmptyState";

const AuditTable = ({ audits }) => {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const toggleRow = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {!audits.length ? <EmptyState title="No audits found" message="Audits not available" /> : (<table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {audits.map((audit) => (
            <React.Fragment key={audit._id}>
              {/* Main Row */}
              <tr
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => toggleRow(audit._id)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {audit.user.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {audit.user.email || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {audit.action || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click when clicking the button
                      toggleRow(audit._id);
                    }}
                  >
                    {expandedRowId === audit._id ? "Collapse" : "Expand"}
                  </button>
                </td>
              </tr>

              {/* Expanded Row */}
              {expandedRowId === audit._id && (
                <tr>
                  <td colSpan="4" className="px-6 py-4 bg-gray-50">
                    <div className="space-y-2">
                      <p>
                        <strong>Details:</strong>{" "}
                        {audit.details || "No details available"}
                      </p>
                      <p>
                        <strong>IP Address:</strong>{" "}
                        {audit.ipAddress || "N/A"}
                      </p>
                      <p>
                        <strong>Timestamp:</strong>{" "}
                        {new Date(audit.timestamp).toLocaleString()}
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

export default AuditTable;