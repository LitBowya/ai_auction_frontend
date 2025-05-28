import React, {useState, useEffect} from "react";
import {toast} from "react-toastify"; // Assuming you have react-toastify installed and configured
// Assuming these components are in your project structure:
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import Spinner from "../../../components/Spinner.jsx";
import {Button} from "../../../components/Button.jsx";

// Import the RTK Query mutation hook
import {useUpdateUserProfileMutation} from "../../../redux/services/userApi.js";

const ProfileInfo = ({profile}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    // Destructure the mutation hook
    const [updateUserProfile, {isLoading: isUpdating, error: updateError}] = useUpdateUserProfileMutation();

    useEffect(() => {
        if (profile) {
            setName(profile.name || "");
            setEmail(profile.email || "");
        }
    }, [profile]);

    if (!profile || !profile._id) {
        // This message is important for initial render or if profile is not yet loaded/available
        return <ErrorMessage message="Profile data is not available."/>;
    }

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleUpdateProfile = async () => {
        if (!name.trim() || !email.trim()) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            // Call the mutation
            const updatedData = await updateUserProfile({
                userId: profile._id,
                name,
                email,
            }).unwrap(); // .unwrap() will throw an error if the mutation fails, which can be caught

            toast.success(updatedData.message || "Profile updated successfully!");

        } catch (err) {
            // Error handling for the mutation
            toast.error(err?.data?.message || err.message || "Failed to update profile. Please try again.");
            console.error("Failed to update profile:", err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Profile Information</h2>
            <div className="space-y-6">
                <div>
                    <label htmlFor="name"
                           className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
                        disabled={isUpdating}
                        placeholder="Enter your full name"
                    />
                </div>
                <div>
                    <label htmlFor="email"
                           className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500"
                        disabled={isUpdating}
                        placeholder="Enter your email address"
                    />
                </div>

                {isUpdating ? (
                    <div className="flex justify-center">
                        <Spinner/>
                    </div>
                ) : (
                    <Button
                        onClick={handleUpdateProfile}
                        className="w-full bg-primary hover:bg-primary-dark text-white dark:bg-amber-600 dark:hover:bg-amber-700 font-semibold py-3 px-4 rounded-lg shadow-md transition duration-150 ease-in-out"
                        disabled={isUpdating}
                    >
                        Update Profile
                    </Button>
                )}
                {/* Displaying mutation error directly if needed, though toast is primary */}
                {updateError && (
                    <div className="mt-2 text-center">
                        <ErrorMessage message={updateError?.data?.message || "An error occurred during update."}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileInfo;
