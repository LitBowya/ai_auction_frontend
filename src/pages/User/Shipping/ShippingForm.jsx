// components/shipping/ShippingForm.js
import React, {useState} from 'react';
import {useSetShippingDetailsMutation} from '../../../redux/services/shippingApi';
import {useSelector, useDispatch} from 'react-redux';
import {addNewShipping} from '../../../redux/slices/shippingSlice';
import {
    FiUser, FiHome, FiMap, FiMail, FiSmartphone, FiCheckSquare, FiSave
} from 'react-icons/fi';
import Spinner from '../../../components/Spinner';

const ShippingForm = ({onSuccess}) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        contactNumber: '',
        isDefault: false,
    });

    const [setShippingDetails, {isLoading}] = useSetShippingDetailsMutation();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.auth.user?._id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await setShippingDetails({
                ...formData,
                buyer: userId,
            }).unwrap();

            dispatch(addNewShipping(res.shipping));
            if (onSuccess) onSuccess();
            setFormData({
                name: '',
                address: '',
                city: '',
                postalCode: '',
                contactNumber: '',
                isDefault: false,
            });
        } catch (err) {
            console.error('Error saving shipping details:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
                {/* Name Input */}
                <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                        required
                    />
                </div>

                {/* Contact Number Input */}
                <div className="relative">
                    <FiSmartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input
                        type="tel"
                        placeholder="Contact Number"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                        required
                    />
                </div>

                {/* Address Input */}
                <div className="relative md:col-span-2">
                    <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input
                        type="text"
                        placeholder="Street Address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                        required
                    />
                </div>

                {/* City Input */}
                <div className="relative">
                    <FiMap className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                        required
                    />
                </div>

                {/* Postal Code Input */}
                <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                    <input
                        type="text"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                        required
                    />
                </div>
            </div>

            {/* Default Address Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer text-gray-600">
                <div className="relative">
                    <input
                        type="checkbox"
                        checked={formData.isDefault}
                        onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
                        className="p-2"
                    />
                    {/* <div className={`w-5 h-5 border rounded-md flex items-center justify-center 
                        ${formData.isDefault ? '' : 'border-gray-300'}`}>
                        <FiCheckSquare className={`text-white text-sm ${formData.isDefault ? 'block' : 'hidden'}`}/>
                    </div> */}
                </div>
                Set as default shipping address
            </label>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-secondary py-3 px-6 rounded-lg hover:bg-primary/80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-bold transition-colors flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <Spinner size="sm"/>
                        <span>Saving...</span>
                    </>
                ) : (
                    <>
                        <FiSave className="text-lg"/>
                        <span>Save Shipping Address</span>
                    </>
                )}
            </button>
        </form>
    );
};

export default ShippingForm;
