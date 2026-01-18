import { Search, Plus } from 'lucide-react';
import { useFinance } from '../../../hooks/useFinance';
import { MonthSelector } from '../../ui/MonthSelector';

interface DashboardHeaderProps {
    onOpenNewTransaction?: () => void;
}

export function DashboardHeader({ onOpenNewTransaction }: DashboardHeaderProps) {
    const { currentDate, setCurrentDate } = useFinance();

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-neutral-1000 hidden md:block">Home</h1>

            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto md:items-center">
                {/* Search */}
                <div className="relative group md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 group-focus-within:text-brand-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Pesquisar lançamentos..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 bg-white text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder:text-neutral-400"
                    />
                </div>

                {/* Month Selector */}
                <MonthSelector currentDate={currentDate} onDateChange={setCurrentDate} />

                {/* Action Button */}
                <button
                    onClick={onOpenNewTransaction}
                    className="flex items-center justify-center gap-2 bg-neutral-1000 text-brand-500 px-4 py-2 rounded-lg font-bold text-sm hover:bg-neutral-800 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden md:inline">Nova transação</span>
                    <span className="md:hidden">Nova</span>
                </button>
            </div>
        </div>
    );
}
