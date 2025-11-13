import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MatchesPage = () => {
  const [rooms] = useState([
    { id: 1, name: "$1 Room", img: "https://i.supaimg.com/f19f4f97-1562-4714-8be3-1b1e4b1a3478.jpg", max: "$80" },
    { id: 2, name: "$5 Room", img: "https://i.supaimg.com/335a2cb1-a511-40f1-90b4-418dd08f32dd.jpg", max: "$400" },
    { id: 3, name: "$10 Room", img: "https://i.supaimg.com/c2276bf6-1b7f-47c4-8dc1-576921839bf8.jpg", max: "$800" },
    { id: 4, name: "$15 Room", img: "https://i.supaimg.com/2cc005e6-4985-4d8d-8015-55a33c0b6a8a.jpg", max: "$1,200" },
    { id: 5, name: "$20 Room", img: "https://i.supaimg.com/34cac5bd-11c1-4ac5-a358-41c3390874f3.jpg", max: "$1,600" }
  ]);

  const [servers, setServers] = useState(() => {
    const initialServers = {};
    rooms.forEach(room => {
      const roomServers = [];
      for (let i = 1; i <= 5; i++) {
        const players = Math.floor(Math.random() * 100);
        const status = players >= 100 ? "Full" : players > 0 ? "Active" : "Waiting";
        roomServers.push({ id: i, players, status });
      }
      initialServers[room.id] = roomServers;
    });
    return initialServers;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setServers(prevServers => {
        const newServers = { ...prevServers };
        Object.keys(newServers).forEach(roomId => {
          newServers[roomId] = newServers[roomId].map(server => {
            if (server.status !== "Full") {
              const newPlayers = Math.min(100, server.players + Math.floor(Math.random() * 5));
              return {
                ...server,
                players: newPlayers,
                status: newPlayers >= 100 ? "Full" : newPlayers > 0 ? "Active" : "Waiting"
              };
            }
            return server;
          });
        });
        return newServers;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-500";
      case "Waiting": return "bg-yellow-500";
      case "Full": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleJoinServer = (roomId, serverId) => {
    navigate(`/server/${roomId}/${serverId}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-4 md:p-6">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-6 shadow-2xl relative"
      >
        <motion.button
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </motion.button>

        <h1 className="text-xl md:text-2xl font-bold text-center tracking-wider">
          📊 Active Matches
        </h1>
      </motion.header>

      <div className="space-y-6">
        {rooms.map((room, idx) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl hover:border-blue-500/30 transition-all"
          >
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/10">
              <motion.img
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={room.img}
                alt={room.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover shadow-lg ring-2 ring-blue-500/30"
              />
              <div className="flex-1">
                <h2 className="text-lg md:text-xl font-bold text-blue-400 flex items-center gap-2">
                  {room.name}
                </h2>
                <p className="text-sm md:text-base text-slate-400 flex items-center gap-2 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  Max Win: <span className="text-green-400 font-semibold">{room.max}</span>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {servers[room.id]?.map((server, serverIdx) => (
                  <motion.div
                    key={server.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: serverIdx * 0.05 }}
                    className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-3 md:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <motion.div
                        animate={{
                          scale: server.status === "Active" ? [1, 1.2, 1] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: server.status === "Active" ? Infinity : 0,
                        }}
                        className={`w-3 h-3 rounded-full ${getStatusColor(server.status)} shadow-lg`}
                        style={{
                          boxShadow: server.status === "Active"
                            ? "0 0 10px rgba(34, 197, 94, 0.8)"
                            : server.status === "Waiting"
                            ? "0 0 10px rgba(234, 179, 8, 0.8)"
                            : "0 0 10px rgba(239, 68, 68, 0.8)"
                        }}
                      />
                      <div>
                        <div className="font-semibold text-white text-sm md:text-base">
                          Server #{server.id}
                        </div>
                        <div className="text-xs md:text-sm text-slate-400 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {server.players}/100 players
                        </div>
                      </div>
                    </div>

                    <div className="w-full sm:w-32 bg-slate-800/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${server.players}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full ${
                          server.players >= 100
                            ? "bg-red-500"
                            : server.players >= 70
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleJoinServer(room.id, server.id)}
                      className="w-full sm:w-auto bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow-lg hover:shadow-blue-500/50"
                    >
                      View
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 bg-slate-900/90 backdrop-blur-sm border border-green-500/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-xl"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
        />
        <span className="text-xs font-semibold text-green-400">Live Updates</span>
      </motion.div>
    </div>
  );
};

export default MatchesPage;
