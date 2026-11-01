import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Paketler from './pages/Paketler.jsx';
import Rehberler from './pages/Rehberler.jsx';
import Rehber from './pages/Rehber.jsx';
import Hakkimda from './pages/Hakkimda.jsx';
import Iletisim from './pages/Iletisim.jsx';
import LegalPage from './pages/LegalPage.jsx';
import gizlilik from './content/pages/gizlilik.md?raw';

// Old addresses from the previous (plain HTML) site → new pages
const OLD = {
  '/index.html': '/',
  '/egitim.html': '/paketler',
  '/rehberler.html': '/rehberler',
  '/hakkimda.html': '/hakkimda',
  '/iletisim.html': '/iletisim',
  '/gizlilik.html': '/gizlilik',
};

function Fallback() {
  const { pathname, hash } = useLocation();
  const guide = pathname.match(/^\/rehber-(.+)\.html$/);
  const to = guide ? `/rehberler/${guide[1]}` : OLD[pathname] || '/';
  return <Navigate to={to + hash} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="paketler" element={<Paketler />} />
        <Route path="rehberler" element={<Rehberler />} />
        <Route path="rehberler/:slug" element={<Rehber />} />
        <Route path="hakkimda" element={<Hakkimda />} />
        <Route path="iletisim" element={<Iletisim />} />
        <Route path="gizlilik" element={<LegalPage source={gizlilik} />} />
        <Route path="*" element={<Fallback />} />
      </Route>
    </Routes>
  );
}
