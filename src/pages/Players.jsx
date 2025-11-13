import React, { useEffect, useState } from "react";
import { User, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const statuses = [
  { text: "Playing Match", color: "bg-green-500", textColor: "text-green-500" },
  { text: "Navigating Rooms", color: "bg-blue-500", textColor: "text-blue-500" },
  { text: "Chatting", color: "bg-yellow-400", textColor: "text-yellow-400" },
  { text: "Idle", color: "bg-gray-400", textColor: "text-gray-400" },
];

const generatePlayers = (num = 1000) =>
  Array.from({ length: num }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    return { id: i + 1, name: `Player${i + 1}`, status };
  });

export default function Players() {
  const [players, setPlayers] = useState(generatePlayers(1000));

  // Simulate live status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers((prev) =>
        prev.map((player) => ({
          ...player,
          status: statuses[Math.floor(Math.random() * statuses.length)],
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[url('https://i.supaimg.com/f27c6130-082e-4bfc-abc0-f58d684717f3.png')] bg-cover bg-center backdrop-blur-sm text-white flex flex-col">
      {/* Header */}
      <header className="relative bg-black/60 border-b border-white/10 text-center p-5 flex flex-col items-center">
        <button
          className="absolute left-5 top-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium"
          onClick={() => window.location.href = "/superadmin"}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <img
          src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
          alt="1MoneyArena Logo"
          className="h-16 mb-2"
        />
        <h1 className="text-2xl font-semibold">1MoneyArena</h1>
      </header>

      {/* Title */}
      <h2 className="text-center text-xl font-medium mt-6 text-white drop-shadow-lg">
        🧠 Live Player Activity Monitor
      </h2>

      {/* Player List */}
      <div className="max-w-4xl mx-auto mt-8 bg-black/60 rounded-2xl p-6 shadow-lg overflow-hidden">
        <AnimatePresence>
          {players.slice(0, 1000).map((player) => (
            <motion.div
              key={player.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex justify-between items-center p-4 border-b border-white/15 last:border-b-0"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{player.name}</span>
                <span className="text-gray-400 text-sm">{player.status.text}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${player.status.color}`}
                ></span>
                <span className={`font-medium ${player.status.textColor}`}>
                  {player.status.text}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
