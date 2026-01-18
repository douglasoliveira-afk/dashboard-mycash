export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string; // ISO Date string
    paymentMethod: string;
    installments?: string; // e.g. "1/12"
}

export interface FinanceSummary {
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
}

export interface FinanceContextData {
    transactions: Transaction[];
    summary: FinanceSummary;
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    removeTransaction: (id: string) => void;
}
