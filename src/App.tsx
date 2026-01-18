import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';

// Placeholder Pages
function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-neutral-1000 mb-2">Home</h1>
      <p className="text-neutral-500">Visão geral do sistema.</p>
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
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/goals" element={<PlaceholderPage title="Objetivos" />} />
        <Route path="/cards" element={<PlaceholderPage title="Cartões" />} />
        <Route path="/transactions" element={<PlaceholderPage title="Transações" />} />
        <Route path="/profile" element={<PlaceholderPage title="Perfil" />} />
      </Route>
    </Routes>
  );
}

export default App;
