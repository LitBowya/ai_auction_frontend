"use client";

import React, {useState} from "react";
import {toast} from "sonner";
import Button from "@/components/Button";

const ProfileInfo = ({ profile }) => {
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);

    const handleUpdateProfile = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${profile._id}/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email }),
            });

            if (!response.ok) throw new Error("Failed to update profile");

            const data = await response.json();
            toast.success("Profile updated successfully");
            console.log(data.user); // Updated user profile data
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
                    />
                </div>
                <Button
                    onClick={handleUpdateProfile}
                    text="Update Profile"
                    variant="primary"
                />
            </div>
        </div>
    );
};

export default ProfileInfo;
