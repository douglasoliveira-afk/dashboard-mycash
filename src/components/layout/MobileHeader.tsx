import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LogOut, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';
import { NAV_ITEMS } from '../../config/navItems';

export function MobileHeader() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="md:hidden bg-surface border-b border-neutral-200 sticky top-0 z-30 px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-neutral-1000 rounded-lg flex items-center justify-center text-brand-500">
                    <Zap className="w-5 h-5 fill-current" />
                </div>
                <span className="text-xl font-bold text-neutral-1000 tracking-tight">
                    Mycash+
                </span>
            </div>

            {/* Profile / Menu Trigger */}
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-10 h-10 rounded-full overflow-hidden border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                    <img src="https://github.com/shadcn.png" alt="User" className="w-full h-full object-cover" />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 z-40 bg-black/20"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Content */}
                        <div className="absolute right-0 top-full mt-2 w-56 bg-surface rounded-xl shadow-lg border border-neutral-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                            <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
                                <p className="font-bold text-neutral-1000">Lucas Marte</p>
                                <p className="text-xs text-neutral-500">lucasmarte@gmail.com</p>
                            </div>

                            <nav className="p-2 space-y-1">
                                {NAV_ITEMS.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            cn(
                                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                                isActive
                                                    ? "bg-brand-500 text-neutral-1000"
                                                    : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-1000"
                                            )
                                        }
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.label}
                                    </NavLink>
                                ))}
                            </nav>

                            <div className="p-2 border-t border-neutral-100">
                                <button className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-sm font-medium text-danger-500 hover:bg-danger-50 rounded-lg transition-colors">
                                    <LogOut className="w-4 h-4" />
                                    Sair
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}
