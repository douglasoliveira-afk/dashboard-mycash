import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function MainLayout() {
    return (
        <div className="min-h-screen bg-neutral-100 font-sans text-neutral-1000">
            {/* Sidebar - Desktop Only (Fixed) */}
            <Sidebar />

            {/* Main Content Area */}
            {/* ml-64 to offset the fixed 64 (16rem/256px) sidebar on desktop */}
            <div className="md:ml-64 min-h-screen transition-all duration-300">
                <main className="p-6 md:p-8 max-w-[1920px] mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
