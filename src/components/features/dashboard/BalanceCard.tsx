import { TrendingUp } from 'lucide-react';
import { CountUp } from '../../ui/CountUp';
import { formatCurrency } from '../../../utils/format';

interface BalanceCardProps {
    totalBalance: number;
    growthPercentage: number;
}

export function BalanceCard({ totalBalance, growthPercentage }: BalanceCardProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-neutral-1000 p-6 text-neutral-0 shadow-lg md:col-span-2">
            {/* Decorative Blur - Lime Green */}
            <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
                <div>
                    <span className="text-sm font-medium text-neutral-400">Saldo Total</span>
                    <div className="mt-2 text-3xl font-bold tracking-tight md:text-4xl text-neutral-0">
                        <CountUp value={totalBalance} formatter={formatCurrency} />
                    </div>
                </div>

                <div className="inline-flex items-center gap-2 self-start rounded-full bg-neutral-0/10 px-3 py-1.5 text-sm backdrop-blur-sm">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-neutral-1000">
                        <TrendingUp className="h-3 w-3" />
                    </div>
                    <span className="font-medium text-brand-500">
                        +{growthPercentage}% <span className="text-neutral-400 font-normal">esse mês</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
