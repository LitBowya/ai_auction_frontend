import {FaCreditCard, FaUserCircle, FaDollarSign, FaExclamationTriangle} from 'react-icons/fa';
import {setOrder} from '../../../redux/slices/orderSlice';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {FiCheckCircle, FiCreditCard, FiSmile} from "react-icons/fi";

const PaymentsPrompt = ({highestBidder, highestBid, auction, isPaid}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleOrder = () => {
        dispatch(setOrder({auctionPrice: highestBid, auction: auction}))
        navigate('/shipping')
    }

    return (
        <div>
            {isPaid ? (<div
                className="flex items-center justify-center bg-gradient-to-r from-green-100 to-green-300 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
                    <FiCheckCircle className="mx-auto text-6xl text-green-600 mb-4 animate-pulse"/>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                    <p className="text-gray-600 mb-6">
                        Thank you for your payment. Your transaction has been processed successfully and your order is
                        now confirmed.
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                        <FiSmile className="text-2xl text-yellow-500"/>
                        <span className="text-gray-700">Have a wonderful day!</span>
                    </div>
                </div>
            </div>) : (
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 shadow-sm">
                    <div className="text-center mb-6">
                        <FaCreditCard className="text-4xl text-blue-600 mx-auto mb-3"/>
                        <h3 className="text-xl font-semibold text-blue-800 mb-2">Payment Required</h3>
                        <p className="text-sm text-blue-600">
                            Congratulations! You're the highest bidder. Please complete your payment to secure the item.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Bidder Information */}
                        <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                            <FaUserCircle className="text-2xl text-blue-500 mr-3"/>
                            <div>
                                <p className="font-medium text-gray-700">{highestBidder?.name || 'Winning Bidder'}</p>
                            </div>
                        </div>

                        {/* Bid Amount */}
                        <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                            <FaDollarSign className="text-2xl text-green-500 mr-3"/>
                            <div>
                                <p className="text-sm text-gray-500">Winning Bid Amount</p>
                                <p className="text-xl font-bold text-green-600">
                                    GHS {highestBid?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                        </div>

                        {/* Payment Warning */}
                        <div className="flex items-start bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <FaExclamationTriangle className="text-xl text-yellow-600 mr-3 mt-1"/>
                            <div>
                                <p className="text-sm text-yellow-700">
                                    Please complete payment within 24 hours to avoid cancellation of your bid.
                                </p>
                            </div>
                        </div>

                        {/* Payment Button */}
                        <button
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                            onClick={handleOrder}>
                            <FaCreditCard className="mr-2"/>
                            Proceed to Payment
                        </button>
                    </div>
                </div>)}
        </div>
    );
};

export default PaymentsPrompt;
