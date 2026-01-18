import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { CountUp } from '../../ui/CountUp';
import { formatCurrency } from '../../../utils/format';

interface StatCardProps {
    label: string;
    value: number;
    icon: LucideIcon;
    variant: 'income' | 'expense';
}

export function StatCard({ label, value, icon: Icon, variant }: StatCardProps) {
    const isIncome = variant === 'income';

    return (
        <div className="rounded-2xl bg-surface p-6 shadow-sm border border-neutral-100 flex flex-col justify-between md:col-span-1">
            <div className="flex items-start justify-between">
                <span className={cn(
                    "text-sm font-bold",
                    isIncome ? "text-neutral-1000" : "text-neutral-500"
                )}>
                    {label}
                </span>
                <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    isIncome ? "bg-neutral-100 text-neutral-600" : "bg-danger-50 text-danger-500"
                )}>
                    <Icon className="h-5 w-5 rotate-45" /> {/* Arrow icon rotation if needed depending on source icon */}
                </div>
            </div>

            <div className="mt-4">
                <div className="text-2xl font-bold text-neutral-1000">
                    <CountUp value={value} formatter={formatCurrency} />
                </div>
            </div>
        </div>
    );
}
