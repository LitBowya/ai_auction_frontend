"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import { toast } from "sonner";

export default function AddShippingDetails({ params }) {
  const router = useRouter();
  const { id } = params;

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    contactNumber: "",
    isDefault: false,
  });

  const [useDefaultDetails, setUseDefaultDetails] = useState(false);
  const [shippingSaved, setShippingSaved] = useState(false); // Track if shipping is saved

  const { postData: saveShipping, loading: savingShipping } =
    useApi("/shipping");

  const { postData: initiatePayment, loading: initiatingPayment } = useApi(
    `/payments/${id}/pay`
  );

  const { fetchData: fetchDefaultShipping, loading: fetchingShipping } =
    useApi("/shipping");

  const handleFetchDefaultShipping = async () => {
    try {
      const response = await fetchDefaultShipping();

      if (response?.shipping) {
        setFormData({
          name: response.shipping.name,
          address: response.shipping.address,
          city: response.shipping.city,
          postalCode: response.shipping.postalCode,
          contactNumber: response.shipping.contactNumber,
          isDefault: response.shipping.isDefault,
        });
        setUseDefaultDetails(true);
        toast.success("Default shipping details loaded");
      } else {
        toast.error("No default shipping details found");
      }
    } catch (err) {
      toast.error("Failed to fetch default details");
      console.error("Fetch error:", err);
    }
  };

  const handleSaveShipping = async () => {
    try {
      if (!useDefaultDetails) {
        await saveShipping(formData);
        setShippingSaved(true); // Mark shipping as saved
        toast.success("Shipping details saved");
        // Reset form data to its initial state
        setFormData({
          name: "",
          address: "",
          city: "",
          postalCode: "",
          contactNumber: "",
          isDefault: false,
        });
      }
    } catch (err) {
      toast.error("Failed to save shipping details");
      console.error("Save shipping error:", err);
    }
  };

  const handleInitiatePayment = async () => {
    try {
      const paymentResponse = await initiatePayment();

      if (paymentResponse?.paymentUrl) {
        window.location.href = paymentResponse.paymentUrl;
      } else {
        throw new Error("No payment URL received");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment failed");
      console.error("Payment error:", err);
    }
  };

  return (
    <div className=" bg-gray-50 py-8">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Add Shipping Details
        </h1>

        <button
          type="button"
          onClick={handleFetchDefaultShipping}
          disabled={fetchingShipping}
          className="mb-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {fetchingShipping ? "Loading..." : "Use Default Details"}
        </button>

        <form className="space-y-4 ">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
              disabled={useDefaultDetails}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
              disabled={useDefaultDetails}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
              disabled={useDefaultDetails}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={(e) =>
                setFormData({ ...formData, postalCode: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
              disabled={useDefaultDetails}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={(e) =>
                setFormData({ ...formData, contactNumber: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
              disabled={useDefaultDetails}
            />
          </div>

          {!useDefaultDetails && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData({ ...formData, isDefault: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isDefault"
                className="ml-2 block text-sm text-gray-700"
              >
                Save as default shipping address
              </label>
            </div>
          )}

          {/* Save Shipping Button */}
          <button
            type="button"
            onClick={handleSaveShipping}
            disabled={savingShipping}
            className={`w-full ${
              savingShipping
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white py-2 px-4 rounded-md transition-colors`}
          >
            {savingShipping ? "Saving Shipping..." : "Save Shipping"}
          </button>

          {/* Proceed to Payment Button */}
          <button
            type="button"
            onClick={handleInitiatePayment}
            disabled={
              initiatingPayment || (!useDefaultDetails && !shippingSaved)
            }
            className={`w-full ${
              initiatingPayment || (!useDefaultDetails && !shippingSaved)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 px-4 rounded-md transition-colors`}
          >
            {initiatingPayment ? "Processing Payment..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
}
