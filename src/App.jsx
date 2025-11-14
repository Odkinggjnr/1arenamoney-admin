import React, { Suspense } from "react";
import { Routes, Route, useParams, Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import MatchesPage from "./pages/MatchesPage";
import Loading from "./components/Loading";
import Players from "./pages/Players";
import "./index.css";
import RevenueOverview from "./pages/Revenue";
import Withdrawals from "./pages/Withdrawals";
import FinanceAdmin from "./pages/FinanceAdmin";
import GameAdmin from "./pages/GameAdmin";
import Moderator from "./pages/Moderator";
import SupportAdmin from "./pages/SupportAdmin";

// Automatically import all ServerMonitor components inside /pages
const serverModules = import.meta.glob("./pages/ServerMonitor*.jsx");

// Function to dynamically load server components
const getServerComponent = (roomId, serverId) => {
  // Calculate component number based on roomId and serverId
  const componentNumber = (parseInt(roomId) - 1) * 5 + parseInt(serverId);
  const componentName = `ServerMonitor${componentNumber}`;
  const filePath = `./pages/${componentName}.jsx`;

  // Check if the component exists in the imported glob map
  if (!serverModules[filePath]) return null;

  // Lazy load the matched component
  const ServerComponent = React.lazy(serverModules[filePath]);

  return ServerComponent;
};

const App = () => {
  return (
    <Routes>
      {/* FIX ADDED HERE */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="/home" element={<AdminDashboard />} />
      <Route path="/matches" element={<MatchesPage />} />
      <Route path="/players" element={<Players />} />
      <Route path="/revenue" element={<RevenueOverview />} />
      <Route path="/withdrawals" element={<Withdrawals />} />
      <Route path="/finance-admin" element={<FinanceAdmin />} />
      <Route path="/game-admin" element={<GameAdmin />} />
      <Route path="/moderator" element={<Moderator />} />
      <Route path="/support-admin" element={<SupportAdmin />} />

      {/* Dynamic server route */}
      <Route path="/server/:roomId/:serverId" element={<ServerRouter />} />
    </Routes>
  );
};

// Router component for handling dynamic server pages
const ServerRouter = () => {
  const { roomId, serverId } = useParams();
  const ServerComponent = getServerComponent(roomId, serverId);

  if (!ServerComponent) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-lg bg-slate-950">
        🚫 Room {roomId} / Server {serverId} not found or not yet created.
      </div>
    );
  }

  return (
    <Suspense fallback={<Loading />}>
      <ServerComponent />
    </Suspense>
  );
};

export default App;
