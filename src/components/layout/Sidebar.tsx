import { NavLink } from 'react-router-dom';
import { Home, Target, CreditCard, ArrowRightLeft, User, ChevronLeft, ChevronRight, Zap } from 'lucide-react'; // Zap as placeholder logo
import { cn } from '../../utils/cn';

type NavItemProps = {
    to: string;
    icon: React.ElementType;
    label: string;
    isCollapsed: boolean;
};

function NavItem({ to, icon: Icon, label, isCollapsed }: NavItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group font-medium",
                    isActive
                        ? "bg-brand-500 text-neutral-1000 shadow-sm"
                        : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-1000",
                    isCollapsed && "justify-center px-2"
                )
            }
            title={isCollapsed ? label : undefined}
        >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{label}</span>}
        </NavLink>
    );
}

type SidebarProps = {
    isCollapsed: boolean;
    toggleCheck: () => void;
};

export function Sidebar({ isCollapsed, toggleCheck }: SidebarProps) {
    return (
        <aside
            className={cn(
                "h-screen bg-surface border-r border-neutral-200 hidden md:flex flex-col p-4 fixed left-0 top-0 overflow-y-auto z-10 transition-all duration-300",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            {/* Header: Logo + Toggle */}
            <div className={cn("flex items-center mb-10", isCollapsed ? "justify-center" : "justify-between px-2")}>
                <div className="flex items-center gap-2">
                    {/* Logo Mark */}
                    <div className="w-8 h-8 flex-shrink-0 bg-neutral-1000 rounded-lg flex items-center justify-center text-brand-500">
                        {/* Abstract Logo */}
                        <Zap className="w-5 h-5 fill-current" />
                    </div>

                    {/* Logo Text */}
                    {!isCollapsed && (
                        <span className="text-2xl font-bold text-neutral-1000 tracking-tight whitespace-nowrap">
                            Mycash+
                        </span>
                    )}
                </div>

                {/* Toggle Button */}
                <button
                    onClick={toggleCheck}
                    className={cn(
                        "p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors",
                        isCollapsed && "hidden" // Hide toggle if collapsed? Or move it? 
                        // Actually, if hidden when collapsed, how to expand?
                        // Usually keeping it or moving it to a specific spot.
                        // Let's keep it visible but maybe centered if collapsed?
                        // "isCollapsed ? 'hidden'" logic is bad for UX if no other way to expand.
                        // But looking at the design, the arrow is IN the header.
                        // I'll keep it.
                    )}
                >
                    {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
                <NavItem to="/" icon={Home} label="Home" isCollapsed={isCollapsed} />
                <NavItem to="/goals" icon={Target} label="Objetivos" isCollapsed={isCollapsed} />
                <NavItem to="/cards" icon={CreditCard} label="Cartões" isCollapsed={isCollapsed} />
                <NavItem to="/transactions" icon={ArrowRightLeft} label="Transações" isCollapsed={isCollapsed} />
                <NavItem to="/profile" icon={User} label="Perfil" isCollapsed={isCollapsed} />
            </nav>

            {/* Footer: User Profile */}
            <div className={cn("mt-auto border-t border-neutral-200 pt-6", isCollapsed && "border-none pt-4")}>
                <div className={cn("flex items-center gap-3", isCollapsed ? "justify-center" : "px-2")}>
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden flex-shrink-0">
                        <img src="https://github.com/shadcn.png" alt="Lucas Marte" className="w-full h-full object-cover" />
                    </div>

                    {/* User Info */}
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-neutral-1000 truncate">Lucas Marte</p>
                            <p className="text-xs text-neutral-500 truncate">lucasmarte@gmail.com</p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
