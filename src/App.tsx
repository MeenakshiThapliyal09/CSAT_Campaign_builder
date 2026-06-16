import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ContentPage from './pages/ContentPage';
import StylingPage from './pages/StylingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/content" replace />} />
      <Route element={<MainLayout />}>
        <Route path="/content" element={<ContentPage />} />
        <Route path="/styling" element={<StylingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
