'use client';
import {useState} from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Overlay from './components/Overlay';
import Footer from './components/Footer';

export default function AdminLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar onMenuClick={toggleSidebar} />

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} />

            {/* Overlay for Mobile */}
            <Overlay isOpen={isSidebarOpen} onClose={closeSidebar} />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6 md:ml-64">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
