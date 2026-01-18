import { NavLink } from 'react-router-dom';
import { Home, Target, CreditCard, ArrowRightLeft, User, LogOut } from 'lucide-react';
import { cn } from '../../utils/cn';

type NavItemProps = {
    to: string;
    icon: React.ElementType;
    label: string;
};

function NavItem({ to, icon: Icon, label }: NavItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group font-medium",
                    isActive
                        ? "bg-brand-500 text-neutral-1000 shadow-sm"
                        : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-1000"
                )
            }
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </NavLink>
    );
}

export function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-surface border-r border-neutral-200 hidden md:flex flex-col p-6 fixed left-0 top-0 overflow-y-auto z-10">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-10 px-2">
                <div className="w-8 h-8 bg-neutral-1000 rounded-lg flex items-center justify-center text-brand-500 font-bold">
                    M+
                </div>
                <span className="text-2xl font-bold text-neutral-1000 tracking-tight">
                    Mycash+
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                <NavItem to="/" icon={Home} label="Home" />
                <NavItem to="/goals" icon={Target} label="Objetivos" />
                <NavItem to="/cards" icon={CreditCard} label="Cartões" />
                <NavItem to="/transactions" icon={ArrowRightLeft} label="Transações" />
                <NavItem to="/profile" icon={User} label="Perfil" />
            </nav>

            {/* Footer / Logout */}
            <div className="mt-auto border-t border-neutral-200 pt-6">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-neutral-500 hover:text-danger-500 hover:bg-danger-100 rounded-lg transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sair</span>
                </button>
            </div>
        </aside>
    );
}
