import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { useFinance } from '../../../hooks/useFinance';
import { BalanceCard } from './BalanceCard';
import { StatCard } from './StatCard';

export function SummaryCards() {
    const { summary } = useFinance();

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 mb-8">
            {/* Balance Card takes 2 cols on desktop */}
            <BalanceCard
                totalBalance={summary.totalBalance}
                growthPercentage={12} // Hardcoded for Prompt 5 requirement "ex: +12%" until context logic updates
            />

            <StatCard
                label="Receitas"
                value={summary.totalIncome}
                icon={ArrowDownLeft}
                variant="income"
            />

            <StatCard
                label="Despesas"
                value={summary.totalExpenses}
                icon={ArrowUpRight}
                variant="expense"
            />
        </div>
    );
}
