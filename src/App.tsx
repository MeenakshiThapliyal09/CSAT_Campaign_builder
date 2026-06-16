import { Navigate, Route, Routes } from 'react-router-dom';
import ContentPage from './pages/ContentPage';
import StylingPage from './pages/StylingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/content" replace />} />
      <Route path="/content" element={<ContentPage />} />
      <Route path="/styling" element={<StylingPage />} />
    </Routes>
  );
}

export default App;
