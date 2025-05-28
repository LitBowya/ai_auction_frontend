import {Route, Routes} from "react-router-dom";
// Layouts
import AdminLayout from "./layouts/AdminLayout.jsx";
import UserLayout from "./layouts/UserLayout.jsx";

// User Pages
import HomePage from "./pages/User/Home/HomePage.jsx";
import {LoginPage} from "./pages/User/LoginPage.jsx";
import {RegisterPage} from "./pages/User/RegisterPage.jsx";
import {ForgotPasswordPage} from "./pages/User/ForgotPasswordPage.jsx";
import AuctionDetailsPage from "./pages/User/AuctionDetails/AuctionDetailsPage.jsx";
import ShippingPage from "./pages/User/Shipping/ShippingPage.jsx";
import OrdersPage from "./pages/User/Orders/OrdersPage.jsx";
import PaymentConfirmation from "./pages/User/Orders/PaymentConfirmation.jsx";
import AuctionsPage from "./pages/User/Auctions/AuctionsPage.jsx";

import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard.jsx";
import Artworks from "./pages/Admin/Artworks/Artworks.jsx";
import Auctions from "./pages/Admin/Auctions/Auctions.jsx";
import Audits from "./pages/Admin/Audits/Audits.jsx";
import Categories from "./pages/Admin/Categories/Categories.jsx";
import Orders from "./pages/Admin/Orders/Orders.jsx";
import Payment from "./pages/Admin/Payments/Payment.jsx";
import Users from "./pages/Admin/Users/Users.jsx";
import ProfilePage from "./pages/Admin/ProfilePage.jsx";
import Profile from "./pages/User/Profile/Profile.jsx";
import AboutUs from "./pages/User/AboutUsPage.jsx";
import ContactUs from "./pages/User/ContactUsPage.jsx";


const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="*" element={
                <UserLayout>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                        <Route path="/shipping" element={<ShippingPage/>}/>
                        <Route path="/orders" element={<OrdersPage/>}/>
                        <Route path="/payment-confirmation" element={<PaymentConfirmation/>}/>
                        <Route path="/auctions" element={<AuctionsPage/>}/>
                        <Route path="/about" element={<AboutUs/>}/>
                        <Route path="/contact" element={<ContactUs/>}/>
                        <Route path="/auctions/:id" element={<AuctionDetailsPage/>}/>
                        <Route path="/profile/:id" element={<Profile/>}/>
                    </Routes>
                </UserLayout>
            }/>


            {/* Protected Admin Dashboard Routes */}
            <Route
                path="/admin/*"
                element={
                    <AdminLayout>
                        <Routes>
                            <Route path="/" element={<AdminDashboard/>}/>
                            <Route path="/artworks" element={<Artworks/>}/>
                            <Route path="/auctions" element={<Auctions/>}/>
                            <Route path="/audits" element={<Audits/>}/>
                            <Route path="/categories" element={<Categories/>}/>
                            <Route path="/orders" element={<Orders/>}/>
                            <Route path="/payments" element={<Payment/>}/>
                            <Route path="/users" element={<Users/>}/>
                            <Route path="/profile" element={<ProfilePage/>}/>
                        </Routes>
                    </AdminLayout>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
