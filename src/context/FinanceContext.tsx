import { createContext, useState, useMemo, type ReactNode } from 'react';
import type { Transaction, FinanceContextData, FinanceSummary } from '../types/finance';

export const FinanceContext = createContext<FinanceContextData>({} as FinanceContextData);

const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: '1',
        description: 'Salário Mensal',
        amount: 12000,
        type: 'income',
        category: 'Salário',
        date: '2026-01-05',
        paymentMethod: 'Conta Corrente'
    },
    {
        id: '2',
        description: 'Aluguel',
        amount: 4000,
        type: 'expense',
        category: 'Moradia',
        date: '2026-01-10',
        paymentMethod: 'Pix'
    },
    {
        id: '3',
        description: 'Supermercado Mensal',
        amount: 1500,
        type: 'expense',
        category: 'Alimentação',
        date: '2026-01-12',
        paymentMethod: 'Cartão de Crédito'
    },
    {
        id: '4',
        description: 'Academia',
        amount: 120,
        type: 'expense',
        category: 'Saúde',
        date: '2026-01-15',
        paymentMethod: 'Cartão de Crédito'
    },
    {
        id: '5',
        description: 'Jantar Fora',
        amount: 250,
        type: 'expense',
        category: 'Lazer',
        date: '2026-01-17',
        paymentMethod: 'Cartão Nubank'
    },
    {
        id: '6',
        description: 'Freelance Design',
        amount: 2500,
        type: 'income',
        category: 'Freelance',
        date: '2026-01-18',
        paymentMethod: 'Pix'
    }
];

interface FinanceProviderProps {
    children: ReactNode;
}

export function FinanceProvider({ children }: FinanceProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

    const summary = useMemo(() => {
        return transactions.reduce(
            (acc, transaction) => {
                if (transaction.type === 'income') {
                    acc.totalIncome += transaction.amount;
                    acc.totalBalance += transaction.amount;
                } else {
                    acc.totalExpenses += transaction.amount;
                    acc.totalBalance -= transaction.amount;
                }
                return acc;
            },
            { totalBalance: 0, totalIncome: 0, totalExpenses: 0 } as FinanceSummary
        );
    }, [transactions]);

    function addTransaction(transactionInput: Omit<Transaction, 'id'>) {
        const newTransaction: Transaction = {
            ...transactionInput,
            id: crypto.randomUUID(),
        };
        setTransactions((state) => [newTransaction, ...state]);
    }

    function removeTransaction(id: string) {
        setTransactions((state) => state.filter((t) => t.id !== id));
    }

    return (
        <FinanceContext.Provider value={{ transactions, summary, addTransaction, removeTransaction }}>
            {children}
        </FinanceContext.Provider>
    );
}
