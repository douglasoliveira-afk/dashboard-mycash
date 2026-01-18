import { X } from 'lucide-react';
import { type ReactNode, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    useEffect(() => {
        // Prevent scrolling when modal is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-neutral-1000/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Content */}
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-neutral-1000">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-neutral-100 rounded-full text-neutral-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
