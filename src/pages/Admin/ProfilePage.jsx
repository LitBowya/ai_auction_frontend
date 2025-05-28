import React from "react";
import {FaUser, FaEnvelope, FaPhone, FaCalendar, FaIdBadge, FaEdit} from "react-icons/fa";
import {RiShieldUserFill} from "react-icons/ri";
import {useSelector} from "react-redux";
import {format} from "date-fns";

const Profile = () => {
    const auth = useSelector((state) => state.auth);
    const {name, email, phone, profileImage, isAdmin, address, createdAt} = auth.user;


    return (
        <div className={`max-width`}>
            <div className=" py-8 px-4">
                <div className=" bg-white rounded-2xl shadow-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="relative bg-gradient-to-r from-blue-100 to-blue-900 h-32">
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <div className="relative group">
                                <img
                                    src={profileImage}
                                    alt={name}
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                                />
                                <button
                                    className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                                    <FaEdit className="text-purple-600"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="pt-20 px-6 pb-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
                            <div className="flex justify-center space-x-2 mb-4">

                                    <span
                                        className={` px-3 py-1 rounded-full text-sm font-medium flex items-center`}
                                    >
                  <RiShieldUserFill className="mr-2"/>
                                        {isAdmin}
                </span>

                            </div>

                        </div>

                        {/* Details Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center mb-2">
                                    <FaEnvelope className="text-purple-600 mr-2"/>
                                    <h3 className="font-semibold text-gray-700">Email</h3>
                                </div>
                                <p className="text-gray-600 break-all">{email}</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center mb-2">
                                    <FaPhone className="text-blue-600 mr-2"/>
                                    <h3 className="font-semibold text-gray-700">Phone</h3>
                                </div>
                                <p className="text-gray-600">{phone}</p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center mb-2">
                                    <FaCalendar className="text-green-600 mr-2"/>
                                    <h3 className="font-semibold text-gray-700">Member Since</h3>
                                </div>
                                <p className="text-gray-600">
                                    {format(new Date(createdAt), "PP")}
                                </p>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex items-center mb-2">
                                    <FaUser className="text-orange-600 mr-2"/>
                                    <h3 className="font-semibold text-gray-700">Address</h3>
                                </div>
                                <p className="text-gray-600">{address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
