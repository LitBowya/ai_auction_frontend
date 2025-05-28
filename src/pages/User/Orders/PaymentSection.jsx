// components/order/PaymentSection.js

import {useInitiatePaymentMutation} from '../../../redux/services/paymentApi';
import {FiCreditCard, FiLock, FiCalendar, FiSave} from 'react-icons/fi';
import Spinner from '../../../components/Spinner';
import {toast} from "react-toastify";
import {useSelector} from 'react-redux';

const PaymentSection = ({auctionId}) => {

    const [initiatePayment, {isLoading, isError}] = useInitiatePaymentMutation();
    const shipping = useSelector(state => state.shipping);
    const shippingId = shipping.selectedShipping

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await initiatePayment({
                auctionId, shippingId
            }).unwrap();
            // Check if paymentUrl exists in the response
            if (response.paymentUrl) {
                // Redirect the user to the Paystack payment page
                window.location.href = response.paymentUrl; // This will navigate the browser
            } else {
                toast.error('Payment URL not received. Please try again.');
                console.error('Backend did not return a paymentUrl:', response);
            }
            toast.success('Payment initiated successfully');

        } catch (err) {
            console.error('Payment failed:', err);
            toast.error('Error', err.data.message)
        }
    };

    return (
        <div className="border rounded-lg p-6 bg-gray-50">
            <div className="flex items-center gap-3 mb-6">
                <FiCreditCard className="text-2xl text-primary-600"/>
                <h3 className="text-lg font-semibold">Make Payments</h3>
            </div>

            <button
                type="submit"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-primary py-3 px-6 rounded-lg font-bold text-secondary cursor-pointer hover:bg-primary/70  disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <Spinner size="sm"/>
                        <span>Processing Payment...</span>
                    </>
                ) : (
                    <>
                        <FiSave className="text-lg"/>
                        <span>Pay Now</span>
                    </>
                )}
            </button>

            {isError && (
                <p className="text-red-600 text-sm mt-3 text-center">
                    Payment failed. Please check your details and try again.
                </p>
            )}
        </div>
    );
};

export default PaymentSection;
