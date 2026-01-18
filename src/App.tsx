import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { FinanceProvider } from './context/FinanceContext';
import { SummaryCards } from './components/features/dashboard/SummaryCards';
import { DashboardHeader } from './components/features/dashboard/DashboardHeader';
import { CategoryChart } from './components/features/dashboard/CategoryChart';
import { FinancialFlowChart } from './components/features/dashboard/FinancialFlowChart';
import { AccountsWidget } from './components/features/dashboard/AccountsWidget';
import { UpcomingExpenses } from './components/features/dashboard/UpcomingExpenses';
import { TransactionsTable } from './components/features/dashboard/TransactionsTable';
import { NewTransactionModal } from './components/features/modals/NewTransactionModal';
import { useState } from 'react';

// Pages
function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <DashboardHeader onOpenNewTransaction={() => setIsModalOpen(true)} />
      <SummaryCards />

      {/* Analytics Grid Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Chart Area - Span 2 */}
        <div className="md:col-span-2">
          <FinancialFlowChart />
        </div>

        {/* Side Widget - Span 1 */}
        <div className="md:col-span-1 space-y-6">
          <AccountsWidget />
          <CategoryChart />
        </div>
      </div>

      {/* Data Grid Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming Expenses - 1 Col */}
        <div className="md:col-span-1">
          <UpcomingExpenses />
        </div>

        {/* Transactions Table - 2 Cols */}
        <div className="md:col-span-2">
          <TransactionsTable />
        </div>
      </div>

      <NewTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-1000 mb-2">{title}</h1>
      <p className="text-neutral-500">Em construção.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <FinanceProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/goals" element={<PlaceholderPage title="Objetivos" />} />
            <Route path="/cards" element={<PlaceholderPage title="Cartões" />} />
            <Route path="/transactions" element={<PlaceholderPage title="Transações" />} />
            <Route path="/profile" element={<PlaceholderPage title="Perfil" />} />
          </Route>
        </Routes>
      </FinanceProvider>
    </BrowserRouter>
  );
}

export default App;
