'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Button from '@/components/Button';
import { FaHome } from 'react-icons/fa';

export default function Sidebar({ isOpen }) {
    const pathname = usePathname(); // Get the current route

    // Define the sidebar links
    const links = [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/auctions', label: 'Auctions' },
        { href: '/artworks', label: 'Artworks' },
        { href: '/payments', label: 'Payments' },
        { href: '/categories', label: 'Categories' },
        { href: '/orders', label: 'Orders' },
        { href: '/users', label: 'Users' },
        { href: '/audits', label: 'Audits' },

    ];

    return (
        <aside
            className={`w-64 bg-white shadow-md p-4 transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 md:block fixed top-16 left-0 h-[calc(100vh-64px)] z-50`}
        >
            <nav className='flex flex-col justify-between h-full'>
                <ul className="space-y-2">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`block px-4 py-2 font-semibold rounded hover:bg-gray-200 ${
                                    pathname === link.href
                                        ? 'bg-blue-500 text-white font-bold' // Active link styles
                                        : 'text-gray-700' // Default link styles
                                }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Go Home Button */}
            <Link href="/" passHref>
                <Button className='w-full' variant='danger' text='Go Home' icon={<FaHome />} />
            </Link>
            </nav>
        </aside>
    );
}
