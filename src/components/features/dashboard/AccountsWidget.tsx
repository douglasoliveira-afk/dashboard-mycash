import { Plus, ArrowRight, CreditCard } from 'lucide-react';
import { useFinance } from '../../../hooks/useFinance';
import { formatCurrency } from '../../../utils/format';


export function AccountsWidget() {
    const { accounts } = useFinance();

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-neutral-1000" />
                    <h3 className="text-lg font-bold text-neutral-1000">Cards & contas</h3>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-neutral-100 rounded text-neutral-500">
                        <Plus className="w-5 h-5" />
                    </button>
                    <button className="p-1 hover:bg-neutral-100 rounded text-neutral-500">
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-4">
                {accounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-3 hover:bg-neutral-50 rounded-xl transition-colors group cursor-pointer border border-transparent hover:border-neutral-100">
                        {/* Icon + Info */}
                        <div className="flex items-center gap-4">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: account.color }}
                            >
                                {/* Placeholder Icon based on first letter or generic */}
                                {account.name[0]}
                            </div>
                            <div>
                                <p className="font-bold text-neutral-1000">{account.name}</p>
                                {account.dueDate && (
                                    <p className="text-xs text-neutral-500">Vence dia {account.dueDate}</p>
                                )}
                            </div>
                        </div>

                        {/* Balance + Digits */}
                        <div className="text-right">
                            <p className="font-bold text-neutral-1000">{formatCurrency(account.balance)}</p>
                            {account.lastDigits && (
                                <p className="text-xs text-neutral-400">****{account.lastDigits}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
