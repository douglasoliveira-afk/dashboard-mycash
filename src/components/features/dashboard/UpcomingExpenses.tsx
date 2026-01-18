import { Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { useFinance } from '../../../hooks/useFinance';
import { formatCurrency } from '../../../utils/format';
import { useMemo } from 'react';

export function UpcomingExpenses() {
    const { transactions } = useFinance();

    const upcoming = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return transactions
            .filter(t => {
                if (t.type !== 'expense') return false;
                const tDate = new Date(t.date);
                return tDate >= today;
            })
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5);
    }, [transactions]);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')
        };
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-neutral-100 rounded-lg text-neutral-600">
                        <Calendar className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-1000">Próximas despesas</h3>
                </div>
                <button className="p-1 hover:bg-neutral-100 rounded text-neutral-500">
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>

            {/* List */}
            <div className="flex-1 space-y-4">
                {upcoming.length > 0 ? (
                    upcoming.map((expense) => {
                        const { day, month } = formatDate(expense.date);
                        return (
                            <div key={expense.id} className="flex items-center gap-4">
                                {/* Date Box */}
                                <div className="flex-shrink-0 w-12 h-12 bg-neutral-50 rounded-xl flex flex-col items-center justify-center border border-neutral-100">
                                    <span className="text-xs font-bold text-neutral-500 uppercase">{month}</span>
                                    <span className="text-lg font-bold text-neutral-1000 leading-none">{day}</span>
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-neutral-1000 truncate">{expense.description}</p>
                                    <p className="text-xs text-neutral-500 truncate">{expense.category}</p>
                                </div>

                                {/* Amount */}
                                <span className="font-bold text-neutral-1000">{formatCurrency(expense.amount)}</span>
                            </div>
                        );
                    })
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-10 opacity-60">
                        <CheckCircle className="w-12 h-12 text-success-500 mb-3" />
                        <p className="font-medium text-neutral-1000">Tudo pago!</p>
                        <p className="text-sm text-neutral-500">Você não tem despesas pendentes.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
