import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface MonthSelectorProps {
    currentDate: Date;
    onDateChange: (date: Date) => void;
}

export function MonthSelector({ currentDate, onDateChange }: MonthSelectorProps) {
    const formatMonth = (date: Date) => {
        // e.g. "Janeiro 2026"
        return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date);
    };

    const handlePrevMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() - 1);
        onDateChange(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() + 1);
        onDateChange(newDate);
    };

    return (
        <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-lg p-1 shadow-sm">
            <button
                onClick={handlePrevMonth}
                className="p-1 hover:bg-neutral-100 rounded text-neutral-500"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 px-2 min-w-[140px] justify-center text-sm font-bold text-neutral-1000 capitalize">
                <Calendar className="w-4 h-4 text-neutral-400" />
                {formatMonth(currentDate)}
            </div>

            <button
                onClick={handleNextMonth}
                className="p-1 hover:bg-neutral-100 rounded text-neutral-500"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
