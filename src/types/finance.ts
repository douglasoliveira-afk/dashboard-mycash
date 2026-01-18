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

export interface Account {
    id: string;
    name: string;
    balance: number;
    type: 'bank' | 'wallet';
    institution: string; // 'nubank', 'inter', 'picpay'
    color: string;
    dueDate?: number; // e.g. 21
    lastDigits?: string; // e.g. "5897"
}

export interface FinanceSummary {
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
}

export interface FinanceContextData {
    transactions: Transaction[];
    filteredTransactions: Transaction[];
    accounts: Account[];
    summary: FinanceSummary;
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    removeTransaction: (id: string) => void;
}
