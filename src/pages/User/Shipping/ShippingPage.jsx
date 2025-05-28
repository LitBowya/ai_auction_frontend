// pages/ShippingPage.js
import React, {useEffect} from 'react';
import {useGetAllUserShippingQuery} from '../../../redux/services/shippingApi';
import {useSelector, useDispatch} from 'react-redux';
import {setShippingOptions} from '../../../redux/slices/shippingSlice';
import ShippingList from './ShippingList';
import ShippingForm from './ShippingForm';
import {FiTruck, FiPlusCircle, FiMapPin, FiAlertCircle} from 'react-icons/fi';
import Spinner from '../../../components/Spinner';

const ShippingPage = () => {
    const dispatch = useDispatch();
    const {data, isLoading, error} = useGetAllUserShippingQuery();
    const storedShipping = useSelector(state => state.shipping.shippingOptions);

    useEffect(() => {
        if (data?.shipping) {
            dispatch(setShippingOptions(data?.shipping));
        }
    }, [data?.shipping, dispatch]);

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Spinner size="68"/>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex items-center justify-center bg-red-50">
            <div className="text-red-600 flex items-center gap-2">
                <FiAlertCircle className="text-2xl"/>
                <span>Error loading shipping details</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-primary py-24 lg:py-32">
            <div className="max-width bg-gray-50 p-6 rounded-xl">
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <FiTruck className="text-3xl text-primary-600"/>
                        <h1 className="text-2xl font-bold text-gray-900">Shipping Management</h1>
                    </div>

                    <section className="mb-10">
                        <div className="flex items-center gap-2 mb-6">
                            <FiMapPin className="text-xl text-gray-600"/>
                            <h2 className="text-xl font-semibold text-gray-800">Saved Addresses</h2>
                        </div>

                        {storedShipping.length > 0 ? (
                            <ShippingList shippingOptions={storedShipping}/>
                        ) : (
                            <div className="text-center py-8 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No shipping addresses found</p>
                            </div>
                        )}
                    </section>

                    <section className="pt-8 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-6">
                            <FiPlusCircle className="text-xl text-gray-600"/>
                            <h2 className="text-xl font-semibold text-gray-800">Add New Address</h2>
                        </div>
                        <ShippingForm/>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ShippingPage;
