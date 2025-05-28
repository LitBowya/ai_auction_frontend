// components/order/ShippingSection.js
import React from 'react';
import {useDispatch} from 'react-redux';
import {selectShipping} from '../../../redux/slices/shippingSlice';
import {FiMapPin, FiHome, FiCheck, FiTruck, FiStar} from 'react-icons/fi';

const ShippingSection = ({shippingOptions, selectedShipping}) => {
    const dispatch = useDispatch();
    const currentShipping = shippingOptions.find(s => s._id === selectedShipping);

    return (
        <div className="border rounded-lg p-6 bg-gray-50">
            <div className="flex items-center gap-3 mb-6">
                <FiTruck className="text-2xl text-primary-600"/>
                <h3 className="text-lg font-semibold">Shipping Details</h3>
            </div>

            {currentShipping && (
                <div className="mb-6 p-4 border-l-4 border-primary-500 bg-white rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                        <FiMapPin className="text-primary-600"/>
                        <h4 className="font-medium">{currentShipping.name}</h4>
                        {currentShipping.isDefault && (
                            <span className="text-sm text-amber-600 flex items-center gap-1">
                <FiStar className="text-sm"/>
                Default
              </span>
                        )}
                    </div>
                    <p className="text-gray-600 text-sm">{currentShipping.address}</p>
                    <p className="text-gray-600 text-sm">{currentShipping.city} {currentShipping.postalCode}</p>
                    <p className="text-gray-600 text-sm">Contact: {currentShipping.contactNumber}</p>
                </div>
            )}

            <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-700">Select alternate address:</h4>
                {shippingOptions.map(option => (
                    <div
                        key={option._id}
                        onClick={() => dispatch(selectShipping(option._id))}
                        className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center gap-4
              ${option._id === selectedShipping ? 'border-primary-500 bg-primary-50' : 'hover:border-gray-300'}`}
                    >
                        <div className={`w-5 h-5 border rounded-full flex items-center justify-center 
              ${option._id === selectedShipping ? 'border-primary-500 bg-primary-500' : 'border-gray-300'}`}>
                            {option._id === selectedShipping && <FiCheck className="text-white text-xs"/>}
                        </div>
                        <div>
                            <p className="text-sm font-medium">{option.name}</p>
                            <p className="text-xs text-gray-500">{option.city}, {option.postalCode}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShippingSection;
