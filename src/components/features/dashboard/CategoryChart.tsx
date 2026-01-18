import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useFinance } from '../../../hooks/useFinance';
import { formatCurrency } from '../../../utils/format';
import { MoreHorizontal } from 'lucide-react';

const COLORS = ['#DFFE35', '#111827', '#6B7280', '#E5E7EB']; // Brand, Neutral-1000, Neutral-500, Neutral-200

export function CategoryChart() {
    const { filteredTransactions } = useFinance();

    const data = useMemo(() => {
        const expenses = filteredTransactions.filter(t => t.type === 'expense');

        const categories: Record<string, number> = {};
        expenses.forEach(t => {
            categories[t.category] = (categories[t.category] || 0) + t.amount;
        });

        return Object.entries(categories)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 4); // Top 4
    }, [filteredTransactions]);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col h-[400px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-neutral-1000">Despesas por categoria</h3>
                <button className="text-neutral-400 hover:text-neutral-1000">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Selector Mock */}
            <div className="flex bg-neutral-100 rounded-lg p-1 w-fit mb-4">
                <button className="px-3 py-1 bg-white rounded shadow-sm text-xs font-bold text-neutral-1000">Mensal</button>
                <button className="px-3 py-1 text-xs font-medium text-neutral-500 hover:text-neutral-900">Semanal</button>
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: any) => formatCurrency(Number(value))}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text (Total?) or just decoration */}
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-3">
                {data.map((entry, index) => (
                    <div key={entry.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                            <span className="text-neutral-600 font-medium">{entry.name}</span>
                        </div>
                        <span className="font-bold text-neutral-1000">{formatCurrency(entry.value)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
