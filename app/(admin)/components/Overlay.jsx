'use client';

export default function Overlay({ isOpen, onClose }) {
    return (
        <div
            className={`md:hidden fixed inset-0 bg-black opacity-50 z-40 ${
                isOpen ? 'block' : 'hidden'
            }`}
            onClick={onClose}
        ></div>
    );
}
