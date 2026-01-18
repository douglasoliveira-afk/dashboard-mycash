import { useState } from 'react';
import { useFinance } from '../../../hooks/useFinance';
import { Modal } from '../../ui/Modal';
import type { TransactionType } from '../../../types/finance';

interface NewTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NewTransactionModal({ isOpen, onClose }: NewTransactionModalProps) {
    const { addTransaction } = useFinance();

    const [type, setType] = useState<TransactionType>('expense');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || !category) return; // Basic validation

        addTransaction({
            description,
            amount: Number(amount),
            type,
            category,
            date,
            paymentMethod: paymentMethod || 'Outro'
        });

        // Reset and Close
        setDescription('');
        setAmount('');
        setCategory('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Nova Transação">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Type Switcher */}
                <div className="flex bg-neutral-100 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setType('expense')}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${type === 'expense' ? 'bg-white text-danger-500 shadow-sm' : 'text-neutral-500'}`}
                    >
                        Despesa
                    </button>
                    <button
                        type="button"
                        onClick={() => setType('income')}
                        className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${type === 'income' ? 'bg-white text-brand-700 shadow-sm' : 'text-neutral-500'}`}
                    >
                        Receita
                    </button>
                </div>

                {/* Inputs */}
                <div className="space-y-3">
                    <div>
                        <label className="block text-xs font-bold text-neutral-500 mb-1">Descrição</label>
                        <input
                            type="text"
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                            placeholder="Ex: Aluguel, Salário"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-neutral-500 mb-1">Valor (R$)</label>
                            <input
                                type="number"
                                required
                                step="0.01"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                                placeholder="0,00"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-neutral-500 mb-1">Data</label>
                            <input
                                type="date"
                                required
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-neutral-500 mb-1">Categoria</label>
                            <select
                                required
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none bg-white"
                            >
                                <option value="">Selecione</option>
                                <option value="Moradia">Moradia</option>
                                <option value="Alimentação">Alimentação</option>
                                <option value="Salário">Salário</option>
                                <option value="Saúde">Saúde</option>
                                <option value="Lazer">Lazer</option>
                                <option value="Freelance">Freelance</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-neutral-500 mb-1">Método</label>
                            <select
                                value={paymentMethod}
                                onChange={e => setPaymentMethod(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none bg-white"
                            >
                                <option value="">Selecione</option>
                                <option value="Pix">Pix</option>
                                <option value="Cartão de Crédito">Cartão de Crédito</option>
                                <option value="Conta Corrente">Conta Corrente</option>
                                <option value="Dinheiro">Dinheiro</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Action */}
                <button
                    type="submit"
                    className="w-full bg-neutral-1000 text-brand-500 font-bold py-3 rounded-xl hover:bg-neutral-800 transition-colors mt-2"
                >
                    {type === 'expense' ? 'Adicionar Despesa' : 'Adicionar Receita'}
                </button>
            </form>
        </Modal>
    );
}
