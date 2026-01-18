import { ShoppingCart, Home, Activity, Briefcase } from 'lucide-react';
import { useFinance } from '../../../hooks/useFinance';
import { formatCurrency } from '../../../utils/format';

export function TransactionsTable() {
    const { filteredTransactions } = useFinance();

    const getIcon = (category: string) => {
        // Simple placeholder logic
        switch (category.toLowerCase()) {
            case 'alimentação': return ShoppingCart;
            case 'moradia': return Home;
            case 'salário': return Briefcase;
            case 'saúde': return Activity;
            default: return Activity;
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('pt-BR');
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-neutral-100">
                <h3 className="text-lg font-bold text-neutral-1000">Transações recentes</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase font-medium">
                        <tr>
                            <th className="px-6 py-4 rounded-tl-lg">Transação</th>
                            <th className="px-6 py-4">Categoria</th>
                            <th className="px-6 py-4">Data</th>
                            <th className="px-6 py-4">Método</th>
                            <th className="px-6 py-4 text-right rounded-tr-lg">Valor</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 text-sm">
                        {filteredTransactions.slice(0, 10).map((t) => {
                            const Icon = getIcon(t.category);
                            const isIncome = t.type === 'income';

                            return (
                                <tr key={t.id} className="hover:bg-neutral-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isIncome ? 'bg-brand-100 text-neutral-1000' : 'bg-neutral-100 text-neutral-500'}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-neutral-1000">{t.description}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-600">{t.category}</td>
                                    <td className="px-6 py-4 text-neutral-500">{formatDate(t.date)}</td>
                                    <td className="px-6 py-4 text-neutral-500">{t.paymentMethod}</td>
                                    <td className={`px-6 py-4 text-right font-bold ${isIncome ? 'text-neutral-1000' : 'text-danger-500'}`}>
                                        {isIncome ? '+ ' : '- '}
                                        {formatCurrency(t.amount)}
                                    </td>
                                </tr>
                            );
                        })}

                        {filteredTransactions.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-neutral-500">
                                    Nenhuma transação encontrada neste período.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
