import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import MatchesPage from './pages/MatchesPage';
import ServerMonitor1 from './pages/ServerMonitor1';
import ServerMonitor2 from './pages/ServerMonitor2';
import './index.css';
import ServerMonitor3 from './pages/ServerMonitor3';
import ServerMonitor4 from './pages/ServerMonitor4';
import ServerMonitor5 from './pages/ServerMonitor5';

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/matches" element={<MatchesPage />} />

        
        <Route 
          path="/server/:roomId/:serverId" 
          element={<ServerRouter />} 
        />
      </Routes>
  );
};


const ServerRouter = () => {
  const { serverId } = useParams();

  switch (serverId) {
    case "1":
      return <ServerMonitor1 />;
    case "2":
      return <ServerMonitor2 />;
    case "3":
      return <ServerMonitor3 />;
    case "4":
      return <ServerMonitor4 />;
    case "5":
      return <ServerMonitor5 />;
    default:
      return (
        <div className="min-h-screen flex items-center justify-center text-black text-xl">
          🚫 Server {serverId} not found
        </div>
      );
  }
};

export default App;
