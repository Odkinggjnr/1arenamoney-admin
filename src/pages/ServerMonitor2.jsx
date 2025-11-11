import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Clock, TrendingDown, Activity, AlertCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const ServerMonitor2 = () => {
  const { roomId, serverId } = useParams(); 
  const navigate = useNavigate();

  const questions = [
    "What year was Bitcoin created?",
    "Which country has the strongest passport in 2025?",
    "What is the largest social media platform by users?",
    "Who is the CEO of Tesla?",
    "What is the capital city of Nigeria?",
    "Which company owns Instagram?",
    "How many players are there on a football team?",
    "Which ocean lies between Africa and Australia?",
    "What is the chemical symbol for gold?",
    "Who wrote the novel '1984'?",
    "Which planet is closest to the Sun?",
    "How many states are there in the United States?",
    "Who founded Microsoft?",
    "Which country won the FIFA World Cup in 2022?",
    "What does HTTP stand for?"
  ];

  const [serverData, setServerData] = useState({
    players: 100,
    question: 1,
    time: 10,
    status: "Active"
  });

  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString(), message: `[SYSTEM] Monitoring started for Room ${roomId} - Server ${serverId}` }
  ]);

  const logBoxRef = useRef(null);

  const logEvent = (message) => {
    const newLog = {
      time: new Date().toLocaleTimeString(),
      message
    };
    setLogs(prev => [...prev, newLog]);
  };

  useEffect(() => {
    if (logBoxRef.current) {
      logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setServerData(prev => {
        if (prev.status === "Active") {
          const newTime = prev.time - 1;
          
          if (newTime <= 0) {
            const newQuestion = prev.question + 1;
            const eliminatedPlayers = Math.floor(Math.random() * 10);
            const newPlayers = Math.max(1, prev.players - eliminatedPlayers);
            
            logEvent(`Question ${newQuestion} started — ${newPlayers} players left.`);
            
            if (newPlayers <= 1 || newQuestion > questions.length) {
              logEvent("🏆 Server finished — 1 winner remains!");
              return {
                ...prev,
                question: newQuestion,
                players: newPlayers,
                time: 0,
                status: "Finished"
              };
            }
            
            return {
              ...prev,
              question: newQuestion,
              players: newPlayers,
              time: 10
            };
          }
          
          return { ...prev, time: newTime };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [questions.length]);

  const getStatusColor = () => {
    switch (serverData.status) {
      case "Active":
        return "bg-green-500 text-white";
      case "Waiting":
        return "bg-yellow-500 text-black";
      case "Finished":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const handleBack = () => {
    navigate('/matches'); 
  };

  const currentQuestion = questions[serverData.question - 1] || "No question available";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-blue-950 text-white p-4 md:p-6 flex flex-col items-center">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-2xl text-center mb-6"
      >
        <motion.img
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
          src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
          alt="Logo"
          className="h-16 mx-auto mb-3 rounded-xl shadow-lg shadow-blue-500/50"
        />
        <h1 className="text-xl md:text-2xl font-extrabold tracking-wide border-b border-white/10 pb-3">
          🧠 Room {roomId} — Server {serverId} Monitoring
        </h1>
      </motion.header>

      {/* Dashboard */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-2xl bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
      >
        {/* Server Overview */}
        <h2 className="text-lg font-bold mb-4 text-blue-400">Server Overview</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Players Card */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-blue-400/50 transition-all"
          >
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-2">
              <Users className="w-4 h-4" />
              Players Remaining
            </div>
            <motion.div
              key={serverData.players}
              initial={{ scale: 1.2, color: "#ef4444" }}
              animate={{ scale: 1, color: "#ffffff" }}
              className="text-3xl font-extrabold"
            >
              {serverData.players}
            </motion.div>
          </motion.div>

          {/* Current Question Card */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-blue-400/50 transition-all"
          >
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-2">
              <AlertCircle className="w-4 h-4" />
              Current Question
            </div>
            <div className="text-3xl font-extrabold">Q{serverData.question}</div>
          </motion.div>

          {/* Time Left Card */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-blue-400/50 transition-all"
          >
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-2">
              <Clock className="w-4 h-4" />
              Time Left
            </div>
            <motion.div
              key={serverData.time}
              animate={{
                scale: serverData.time <= 3 ? [1, 1.1, 1] : 1,
                color: serverData.time <= 3 ? "#ef4444" : "#ffffff"
              }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-extrabold"
            >
              {serverData.time}s
            </motion.div>
          </motion.div>

          {/* Status Card */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-blue-400/50 transition-all"
          >
            <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-2">
              <Activity className="w-4 h-4" />
              Status
            </div>
            <motion.div
              key={serverData.status}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className={`inline-block px-4 py-1 rounded-full text-sm font-bold ${getStatusColor()}`}
            >
              {serverData.status}
            </motion.div>
          </motion.div>
        </div>

        {/* Current Question Text */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 rounded-xl p-4 text-center mb-6"
        >
          <p className="text-base font-semibold text-cyan-300">{currentQuestion}</p>
        </motion.div>

        {/* Live Logs */}
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-3 text-blue-400 flex items-center gap-2">
            <TrendingDown className="w-5 h-5" />
            Live Logs
          </h2>
          <div
            ref={logBoxRef}
            className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-3 max-h-48 overflow-y-auto text-sm space-y-1"
          >
            <AnimatePresence initial={false}>
              {logs.map((log, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-slate-300 font-mono text-xs leading-relaxed"
                >
                  <span className="text-cyan-400">[{log.time}]</span> {log.message}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Back Button */}
      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ y: -3, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBack}
        className="mt-6 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-3 rounded-full font-semibold shadow-xl hover:shadow-blue-500/50 transition-all flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Matches
      </motion.button>
    </div>
  );
};

export default ServerMonitor2;
