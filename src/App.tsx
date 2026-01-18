import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { FinanceProvider } from './context/FinanceContext';

// Placeholder Pages
import { SummaryCards } from './components/features/dashboard/SummaryCards';

// Pages
function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-1000">Home</h1>
        <button className="bg-neutral-1000 text-brand-500 px-4 py-2 rounded-lg font-bold text-sm hover:bg-neutral-800 transition-colors">
          + Nova transação
        </button>
      </div>

      <SummaryCards />
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
  );
}

export default App;
