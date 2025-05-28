// components/shipping/ShippingList.js
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectShipping} from '../../../redux/slices/shippingSlice';
import {FiCheckCircle, FiStar} from 'react-icons/fi';
import {Link} from "react-router-dom";
import {Button} from "../../../components/Button.jsx";

const ShippingList = ({shippingOptions}) => {
    const dispatch = useDispatch();
    const selectedShipping = useSelector(state => state.shipping.selectedShipping);

    return (
        <div className="grid gap-4">
            {shippingOptions.map((option) => (
                <div
                    key={option._id}
                    onClick={() => dispatch(selectShipping(option._id))}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${selectedShipping === option._id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'}`}
                >
                    <div className="flex items-start gap-4">
                        <div className="mt-1">
                            <FiCheckCircle
                                className={`text-xl ${selectedShipping === option._id ? 'text-primary-600' : 'text-gray-300'}`}
                            />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-gray-900">{option.name}</h3>
                                {option.isDefault && (
                                    <span className="inline-flex items-center gap-1 text-sm text-amber-600">
                                        <FiStar className="text-sm"/>
                                        Default
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-600">{option.address}</p>
                            <p className="text-gray-600">{option.city} {option.postalCode}</p>
                            <p className="text-gray-600 mt-2">
                                Contact: <span className="text-primary-600">{option.contactNumber}</span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex justify-end gap-4">
                {shippingOptions && (<>
                    <Button as={`a`} href={`/orders`}
                            className={`bg-primary text-secondary hover:bg-primary/80 cursor-pointer`}>Go To
                        Orders</Button>
                </>)}
            </div>
        </div>
    );
};

export default ShippingList;
