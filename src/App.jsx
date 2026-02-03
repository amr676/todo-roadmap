import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />} />
    </Routes>
  );
}
