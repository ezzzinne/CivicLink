import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GovernmentLookupPage from './pages/FindRepresentatives';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/lookup" element={<GovernmentLookupPage />} />
      </Routes>
    </Router>
  )
}

export default App
