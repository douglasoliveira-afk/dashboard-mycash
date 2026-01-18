import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { cn } from '../../utils/cn';

export function MainLayout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-neutral-100 font-sans text-neutral-1000">
            {/* Sidebar - Desktop Only (Fixed) */}
            <Sidebar
                isCollapsed={isSidebarCollapsed}
                toggleCheck={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            {/* Main Content Area */}
            <div
                className={cn(
                    "min-h-screen transition-all duration-300",
                    isSidebarCollapsed ? "md:ml-20" : "md:ml-64"
                )}
            >
                <main className="p-6 md:p-8 max-w-[1920px] mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
