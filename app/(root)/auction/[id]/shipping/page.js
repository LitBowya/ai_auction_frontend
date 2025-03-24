"use client"; // Required for client-side interactivity

import {useState} from "react";
import {useRouter} from "next/navigation";
import useApi from "@/hooks/useApi";
import {toast} from "sonner"; // Import toast for notifications

export default function AddShippingDetails({ params }) {
    const router = useRouter();
    const { id } = params; // Extract id from params

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        city: "",
        postalCode: "",
        contactNumber: "",
        isDefault: false,
    });

    const [useDefaultDetails, setUseDefaultDetails] = useState(false); // Track if default details are used

    // Use the useApi hook for saving shipping details
    const { sendRequest: saveShipping, loading: savingShipping, error: shippingError } = useApi(
        `/shipping`,
        "POST"
    );

    // Use the useApi hook for initiating payment
    const { sendRequest: initiatePayment, loading: initiatingPayment, error: paymentError } = useApi(
        `/payments/${id}/pay`,
        "POST"
    );

    // Use the useApi hook for fetching default shipping details
    const { sendRequest: fetchDefaultShipping, loading: fetchingShipping, error: fetchError } = useApi(
        `/shipping/`,
        "GET"
    );

    // Fetch default shipping details and populate the form
    const handleFetchDefaultShipping = async () => {
        try {
            const response = await fetchDefaultShipping();

            if (response.success && response.shipping) {
                // Populate the form with the fetched shipping details
                setFormData({
                    name: response.shipping.name,
                    address: response.shipping.address,
                    city: response.shipping.city,
                    postalCode: response.shipping.postalCode,
                    contactNumber: response.shipping.contactNumber,
                    isDefault: response.shipping.isDefault,
                });
                setUseDefaultDetails(true); // Mark that default details are being used
                toast.success("Default shipping details loaded successfully.");
            } else {
                toast.error(response.message || "No default shipping details found.");
            }
        } catch (err) {
            console.error("Error fetching default shipping details:", err);
            toast.error("Failed to fetch default shipping details.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Save shipping details only if default details are not used
            if (!useDefaultDetails) {
                const shippingResponse = await saveShipping(formData);

                if (!shippingResponse.success) {
                    toast.error(shippingResponse.message || "Failed to save shipping details.");
                    return;
                }

                toast.success("Shipping details saved successfully.");
            }

            // Step 2: Initiate payment
            const paymentResponse = await initiatePayment();

            if (!paymentResponse.success) {
                toast.error(paymentResponse.message || "Failed to initiate payment.");
                return;
            }

            // Step 3: Redirect to the payment URL
            window.location.href = paymentResponse.paymentUrl;
        } catch (err) {
            console.error("Error during shipping or payment:", err);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Add Shipping Details
                </h1>
                {shippingError && <p className="text-red-500">{shippingError}</p>}
                {paymentError && <p className="text-red-500">{paymentError}</p>}
                {fetchError && <p className="text-red-500">{fetchError}</p>}

                {/* Button to fetch default shipping details */}
                <button
                    type="button"
                    onClick={handleFetchDefaultShipping}
                    disabled={fetchingShipping}
                    className="mb-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                >
                    {fetchingShipping ? "Fetching Default Details..." : "Use Default Shipping Details"}
                </button>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) =>
                                setFormData({ ...formData, address: e.target.value })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input
                            type="text"
                            value={formData.city}
                            onChange={(e) =>
                                setFormData({ ...formData, city: e.target.value })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Postal Code
                        </label>
                        <input
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) =>
                                setFormData({ ...formData, postalCode: e.target.value })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            value={formData.contactNumber}
                            onChange={(e) =>
                                setFormData({ ...formData, contactNumber: e.target.value })
                            }
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.isDefault}
                                onChange={(e) =>
                                    setFormData({ ...formData, isDefault: e.target.checked })
                                }
                                className="mr-2"
                            />
                            Set as Default
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={savingShipping || initiatingPayment}
                        className={`w-full ${
                            savingShipping || initiatingPayment ? "bg-gray-400" : "bg-green-600"
                        } text-white py-2 px-4 rounded-md hover:bg-green-700`}
                    >
                        {savingShipping
                            ? "Saving Shipping Details..."
                            : initiatingPayment
                                ? "Initiating Payment..."
                                : "Proceed to Payment"}
                    </button>
                </form>
            </div>
        </div>
    );
}
