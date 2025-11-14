import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import { ArrowLeft, Activity, MessageSquare, Navigation, Clock } from 'lucide-react';

const statuses = [
  { text: "Playing Match", class: "playing", color: "#16a34a", icon: Activity },
  { text: "Navigating Rooms", class: "navigating", color: "#1e90ff", icon: Navigation },
  { text: "Chatting", class: "chatting", color: "#facc15", icon: MessageSquare },
  { text: "Idle", class: "idle", color: "#9ba0a8", icon: Clock }
];

export default function Players() {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Generate initial players
    const initialPlayers = Array.from({ length: 1000 }, (_, i) => {
      const name = 'Player' + (i + 1);
      const statusObj = statuses[Math.floor(Math.random() * statuses.length)];
      return { id: i + 1, name: name, status: statusObj.text };
    });
    setPlayers(initialPlayers);

    // Update statuses every 4 seconds
    const interval = setInterval(() => {
      setPlayers(prev => prev.map(player => ({
        ...player,
        status: statuses[Math.floor(Math.random() * statuses.length)].text
      })));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleBack = () => {
    navigate('/home')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </motion.button>
            
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl">
                  1M
                </div>
                <h1 className="text-xl sm:text-2xl font-bold">1MoneyArena</h1>
              </motion.div>
            </div>

            <div className="w-20 sm:w-24"></div>
          </div>
        </div>
      </header>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center py-8 px-4"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold flex items-center justify-center gap-2">
          <Activity className="w-7 h-7 text-green-400" />
          Live Player Activity Monitor
        </h2>
      </motion.div>

      {/* Player List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-black/30 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
        >
          <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-transparent">
            {players.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-gray-400 py-12"
              >
                No players online right now.
              </motion.p>
            ) : (
              <AnimatePresence mode="popLayout">
                {players.slice(0, 100).map((player, index) => {
                  const statusData = statuses.find(s => s.text === player.status) || statuses[3];
                  const StatusIcon = statusData.icon;
                  
                  return (
                    <motion.div
                      key={player.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.01 }}
                      className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex flex-col gap-1 min-w-0 flex-1">
                        <div className="font-semibold text-sm sm:text-base truncate">
                          {player.name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400 truncate">
                          {player.status}
                        </div>
                      </div>
                      
                      <motion.div
                        key={player.status}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-2 ml-4"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.8, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: statusData.color }}
                        />
                        <StatusIcon 
                          className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" 
                          style={{ color: statusData.color }}
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {statuses.map((status, index) => {
            const count = players.filter(p => p.status === status.text).length;
            const StatusIcon = status.icon;
            
            return (
              <motion.div
                key={status.text}
                whileHover={{ scale: 1.05 }}
                className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/10"
              >
                <div className="flex items-center gap-2 mb-2">
                  <StatusIcon className="w-4 h-4" style={{ color: status.color }} />
                  <span className="text-xs sm:text-sm font-medium text-gray-300">
                    {status.text}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: status.color }}>
                  {count}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
