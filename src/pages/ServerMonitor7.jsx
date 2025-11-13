import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Clock, Activity, Trophy, AlertCircle } from 'lucide-react';

const questions = [
  "In what year did humans first land on the Moon?",
  "What is the largest planet in our Solar System?",
  "Which country is known as the Land of the Rising Sun?",
  "Who invented the telephone?",
  "What is the square root of 144?",
  "Which metal is liquid at room temperature?",
  "Who is known as the Father of Computers?",
  "Which ocean borders the east coast of the United States?",
  "What language has the most words?",
  "Which animal is known to have fingerprints similar to humans?",
  "What is the hardest rock on Earth?",
  "Which continent has the most countries?",
  "What is the chemical formula for water?",
  "Who wrote the novel '1984'?",
  "Which planet is closest to the Sun?"
];

const Alert = ({ type = 'info', message, onClose }) => {
  const colors = {
    info: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
    success: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
    warning: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
    error: 'from-red-500/20 to-pink-500/20 border-red-500/30'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className={`bg-gradient-to-r ${colors[type]} border backdrop-blur-sm rounded-2xl p-4 mb-4 flex items-center gap-3 shadow-lg`}
    >
      <AlertCircle className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      {onClose && (
        <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
          ✕
        </button>
      )}
    </motion.div>
  );
};

export default function ServerMonitor7() {
    const navigate = useNavigate();
        const {roomId, serverId} = useParams();
  const [serverData, setServerData] = useState({
    players: 100,
    question: 1,
    time: 10,
    status: 'Active'
  });
  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString(), msg: '[SYSTEM] Monitoring started for $5 Room - Server 2' }
  ]);
  const [alert, setAlert] = useState(null);
  const logBoxRef = useRef(null);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { time, msg }]);
  };

  useEffect(() => {
    if (logBoxRef.current) {
      logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setServerData(prev => {
        if (prev.status === 'Active') {
          const newTime = prev.time - 1;
          
          if (newTime <= 0) {
            const newQuestion = prev.question + 1;
            const newPlayers = Math.max(1, prev.players - Math.floor(Math.random() * 10));
            
            addLog(`Question ${newQuestion} started — ${newPlayers} players left.`);
            
            if (newPlayers <= 1 || newQuestion > questions.length) {
              addLog('🏆 Server finished — 1 winner remains!');
              setAlert({ type: 'success', message: '🏆 Game completed! Winner declared!' });
              return { ...prev, question: newQuestion, time: 10, players: newPlayers, status: 'Finished' };
            }
            
            if (newPlayers < prev.players - 5) {
              setAlert({ type: 'warning', message: `${prev.players - newPlayers} players eliminated!` });
            }
            
            return { ...prev, question: newQuestion, time: 10, players: newPlayers };
          }
          
          return { ...prev, time: newTime };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

    const handleBack = () => {
        navigate("/matches");
    }
    
  const getStatusColor = () => {
    switch (serverData.status) {
      case 'Active': return 'from-green-500 to-emerald-500';
      case 'Waiting': return 'from-yellow-500 to-orange-500';
      case 'Finished': return 'from-red-500 to-pink-500';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <motion.img
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png"
            alt="Logo"
            className="h-16 md:h-20 mx-auto mb-4 rounded-xl shadow-2xl shadow-emerald-500/20"
          />
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
            🧠 Room {roomId} — Server {serverId} Monitoring
          </h1>
        </motion.header>

        {/* Alerts */}
        <AnimatePresence>
          {alert && (
            <Alert
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert(null)}
            />
          )}
        </AnimatePresence>

        {/* Dashboard */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-700/50"
        >
          <motion.h2 variants={item} className="text-xl font-bold mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-emerald-400" />
            Server Overview
          </motion.h2>

          {/* Info Grid */}
          <motion.div 
            variants={container}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            {/* Players Remaining */}
            <motion.div
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-5 rounded-2xl backdrop-blur-sm border border-slate-600/30 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-5 h-5 text-emerald-400" />
                <p className="text-sm text-slate-400">Players Remaining</p>
              </div>
              <motion.p 
                key={serverData.players}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"
              >
                {serverData.players}
              </motion.p>
            </motion.div>

            {/* Current Question */}
            <motion.div
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-5 rounded-2xl backdrop-blur-sm border border-slate-600/30 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-5 h-5 text-purple-400" />
                <p className="text-sm text-slate-400">Current Question</p>
              </div>
              <motion.p 
                key={serverData.question}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Q{serverData.question}
              </motion.p>
            </motion.div>

            {/* Time Left */}
            <motion.div
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-5 rounded-2xl backdrop-blur-sm border border-slate-600/30 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-orange-400" />
                <p className="text-sm text-slate-400">Time Left</p>
              </div>
              <motion.p 
                key={serverData.time}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`text-3xl font-bold ${serverData.time <= 3 ? 'text-red-400 animate-pulse' : 'bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent'}`}
              >
                {serverData.time}s
              </motion.p>
            </motion.div>

            {/* Status */}
            <motion.div
              variants={item}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-5 rounded-2xl backdrop-blur-sm border border-slate-600/30 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-5 h-5 text-green-400" />
                <p className="text-sm text-slate-400">Status</p>
              </div>
              <motion.span
                key={serverData.status}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`inline-block px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r ${getStatusColor()} shadow-lg`}
              >
                {serverData.status}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Current Question Display */}
          <motion.div
            variants={item}
            key={serverData.question}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 backdrop-blur-sm p-5 rounded-2xl mb-6 border border-emerald-500/20"
          >
            <p className="text-sm text-emerald-400 mb-2 font-semibold">Current Question</p>
            <p className="text-lg font-medium text-white">
              {questions[serverData.question - 1] || "No question available"}
            </p>
          </motion.div>

          {/* Live Logs */}
          <motion.div variants={item}>
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              Live Logs
            </h3>
            <div
              ref={logBoxRef}
              className="bg-slate-900/50 backdrop-blur-sm p-4 rounded-2xl max-h-64 overflow-y-auto border border-slate-700/30 space-y-2"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {logs.map((log, index) => (
                  <motion.div
                    key={`${log.time}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-sm text-slate-300 font-mono bg-slate-800/30 p-2 rounded-lg"
                  >
                    <span className="text-emerald-400">[{log.time}]</span> {log.msg}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 px-8 py-3 rounded-full font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-shadow"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Matches
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
