import { createContext, useState, useMemo, type ReactNode } from 'react';
import type { Transaction, FinanceContextData, FinanceSummary, Account } from '../types/finance';

export const FinanceContext = createContext<FinanceContextData>({} as FinanceContextData);

const MOCK_DATE = new Date(2026, 0, 15); // Jan 15, 2026

const MOCK_ACCOUNTS: Account[] = [
    { id: '1', name: 'Nubank', balance: 5245.00, type: 'bank', institution: 'nubank', color: '#820AD1', dueDate: 21, lastDigits: '5897' },
    { id: '2', name: 'Inter', balance: 2300.00, type: 'bank', institution: 'inter', color: '#FF7A00', dueDate: 10, lastDigits: '5897' },
    { id: '3', name: 'Picpay', balance: 17000.00, type: 'wallet', institution: 'picpay', color: '#11C76F', dueDate: 15, lastDigits: '5897' }
];

const MOCK_TRANSACTIONS: Transaction[] = [
    // ... (Keeping previous mock data, just re-declaring for clarity if I overwrite)
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
    },
    {
        id: '7',
        description: 'Salário Dezembro',
        amount: 11000,
        type: 'income',
        category: 'Salário',
        date: '2025-12-05',
        paymentMethod: 'Conta Corrente'
    },
    {
        id: '8',
        description: 'Aluguel Dezembro',
        amount: 4000,
        type: 'expense',
        category: 'Moradia',
        date: '2025-12-10',
        paymentMethod: 'Pix'
    }
];

interface FinanceProviderProps {
    children: ReactNode;
}

export function FinanceProvider({ children }: FinanceProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
    const [accounts] = useState<Account[]>(MOCK_ACCOUNTS);
    const [currentDate, setCurrentDate] = useState<Date>(MOCK_DATE);

    // Filter Logic
    const filteredTransactions = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        return transactions.filter(t => {
            const tDate = new Date(t.date);
            const tYear = tDate.getFullYear();
            const tMonth = tDate.getMonth();
            return tYear === year && tMonth === month;
        });
    }, [transactions, currentDate]);

    const summary = useMemo(() => {
        return filteredTransactions.reduce(
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
    }, [filteredTransactions]);

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
        <FinanceContext.Provider
            value={{
                transactions,
                filteredTransactions,
                accounts,
                summary,
                currentDate,
                setCurrentDate,
                addTransaction,
                removeTransaction
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
}
