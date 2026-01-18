import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useFinance } from '../../../hooks/useFinance';
import { formatCurrency } from '../../../utils/format';

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export function FinancialFlowChart() {
    const { transactions, currentDate } = useFinance();

    const data = useMemo(() => {
        const year = currentDate.getFullYear();
        const monthlyData = MONTHS.map(month => ({ name: month, income: 0, expense: 0 }));

        transactions.forEach(t => {
            const tDate = new Date(t.date);
            if (tDate.getFullYear() === year) {
                const monthIndex = tDate.getMonth();
                if (transactionTypeMap[t.type]) {
                    monthlyData[monthIndex][transactionTypeMap[t.type]] += t.amount;
                }
            }
        });

        return monthlyData;
    }, [transactions, currentDate]);

    const transactionTypeMap: Record<string, 'income' | 'expense'> = {
        'income': 'income',
        'expense': 'expense'
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col h-[400px]">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-neutral-1000">Fluxo financeiro</h3>
                {/* Legend Custom or Recharts Legend? Recharts Legend is okay but Custom matches tokens better. I'll use Recharts for speed but style it. */}
            </div>

            <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#DFFE35" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#DFFE35" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#6B7280', fontSize: 12 }}
                            tickFormatter={(value) => `R$ ${value / 1000}k`}
                        />
                        <Tooltip
                            formatter={(value: any) => formatCurrency(Number(value))}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Legend verticalAlign="top" height={36} iconType="circle" />
                        <Area
                            type="monotone"
                            dataKey="income"
                            name="Receitas"
                            stroke="#DFFE35"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                        />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            name="Despesas"
                            stroke="#EF4444"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
