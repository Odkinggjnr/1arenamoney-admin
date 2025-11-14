import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, ArrowLeft, Download, Flag, Play, Trophy, 
  User, Calendar, DollarSign, AlertTriangle, FileText,
  Clock, CheckCircle, Eye, Menu
} from 'lucide-react';

// Mock Database
const DB = {
  players: {
    '126727237': { username: 'IronCore', id: '126727237', registered: '2024-03-12', status: 'Active', lastSeen: '2025-11-09 17:30' },
    '6373993': { username: 'QuizMaster', id: '6373993', registered: '2023-11-02', status: 'Active', lastSeen: '2025-11-09 15:30' },
    '900001': { username: 'NovaLord', id: '900001', registered: '2025-01-20', status: 'Active', lastSeen: '2025-11-09 16:10' }
  },
  matches: [
    { matchId: 'match_1085', playerId: '126727237', date: '2025-11-09 17:30', room: '$5', result: '1st', events: [{ t: '00:05', e: 'Answered Q1 correct' }, { t: '00:12', e: 'Answered Q2 wrong' }, { t: '00:22', e: 'Answered Q3 correct' }], video: 'https://i.supaimg.com/2350face-1cb7-424e-ae2f-1f03cf5420c1.jpg' },
    { matchId: 'match_1023', playerId: '6373993', date: '2025-11-09 15:30', room: '$1', result: '2nd', events: [{ t: '00:03', e: 'Joined' }, { t: '00:14', e: 'Finalized' }], video: 'https://i.supaimg.com/2350face-1cb7-424e-ae2f-1f03cf5420c1.jpg' },
    { matchId: 'match_1100', playerId: '900001', date: '2025-11-09 16:05', room: '$1', result: '1st', events: [{ t: '00:03', e: 'Fast correct answers' }, { t: '00:30', e: 'Winner declared' }], video: 'https://i.supaimg.com/2350face-1cb7-424e-ae2f-1f03cf5420c1.jpg' }
  ],
  winners: [
    { username: 'NovaLord', playerId: '900001', room: '$1', position: '1st', prize: '$80', matchId: 'match_1100', video: 'https://i.supaimg.com/2350face-1cb7-424e-ae2f-1f03cf5420c1.jpg' },
    { username: 'IronCore', playerId: '126727237', room: '$5', position: '1st', prize: '$400', matchId: 'match_1085', video: 'https://i.supaimg.com/2350face-1cb7-424e-ae2f-1f03cf5420c1.jpg' },
    { username: 'AceViper', playerId: '555123', room: '$10', position: '1st', prize: '$800', matchId: 'match_1150', video: 'https://i.supaimg.com/2350face-1cb7-424e-ae2f-1f03cf5420c1.jpg' }
  ]
};

// ------------------------ DASHBOARD VIEW ------------------------
function DashboardView({ searchQuery, setSearchQuery, searchResult, handleSearch, clearSearch, goToPlayer, openReplay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid lg:grid-cols-3 gap-4 sm:gap-6"
    >
      <div className="lg:col-span-2 space-y-4 sm:space-y-6">
        {/* Search Card */}
        <div className="bg-black/30 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                Player Search
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Search by unique player ID to view profile & match replays</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter Player ID e.g., 126727237"
                className="w-full bg-black/40 border border-white/20 rounded-lg px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2 sm:gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearch}
                className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base cursor-pointer"
              >
                Search
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearSearch}
                className="flex-1 sm:flex-none bg-gray-700 hover:bg-gray-600 px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base cursor-pointer"
              >
                Clear
              </motion.button>
            </div>
          </div>

          {searchResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 sm:p-4"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <div className="font-bold text-base sm:text-lg">{searchResult.username}</div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    ID: <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => goToPlayer(searchResult.id)}>{searchResult.id}</span>
                  </div>
                </div>
                <div className="text-left sm:text-right text-gray-400 text-xs sm:text-sm">
                  Last seen: {searchResult.lastSeen}
                </div>
              </div>
            </motion.div>
          )}

          <div className="border-t border-white/10 my-4 sm:my-6"></div>

          {/* Recent Matches */}
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm whitespace-nowrap">Match ID</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm whitespace-nowrap">Player</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm whitespace-nowrap">Date</th>
                    <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm whitespace-nowrap"></th>
                  </tr>
                </thead>
                <tbody>
                  {DB.matches.map((match, i) => (
                    <motion.tr
                      key={match.matchId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-2 sm:py-3 px-2 sm:px-4 font-mono text-xs sm:text-sm">{match.matchId}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                        <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => goToPlayer(match.playerId)}>
                          {DB.players[match.playerId]?.username || 'Unknown'}
                        </span>
                      </td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-gray-400 whitespace-nowrap">{match.date}</td>
                      <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm">
                        <span className="text-blue-400 cursor-pointer hover:underline flex items-center gap-1" onClick={() => openReplay(match.video, match.matchId)}>
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          View
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tools Card */}
        <div className="bg-black/30 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
          <h3 className="font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
            Filters & Tools
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">Export logs, flag users, or bulk download replays</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Exporting all logs (demo only).')}
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4" />
              Export Logs
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Flagged selected users (demo only).')}
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
            >
              <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
              Flag Selected
            </motion.button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="space-y-4 sm:space-y-6">
        {/* Winners */}
        <div className="bg-black/30 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4">
            <h3 className="font-bold flex items-center gap-2 text-sm sm:text-base">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              Past Winners
            </h3>
            <span className="text-xs text-gray-400 cursor-pointer">Click to view replay</span>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-2 sm:px-0 text-gray-400 whitespace-nowrap">Player</th>
                    <th className="text-left py-2 px-2 text-gray-400">Room</th>
                    <th className="text-left py-2 px-2 text-gray-400">Pos</th>
                    <th className="text-left py-2 px-2 text-gray-400">Prize</th>
                  </tr>
                </thead>
                <tbody>
                  {DB.winners.map((winner, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-2 px-2 sm:px-0">
                        <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => goToPlayer(winner.playerId)}>
                          {winner.username}
                        </span>
                      </td>
                      <td className="py-2 px-2">{winner.room}</td>
                      <td className="py-2 px-2">{winner.position}</td>
                      <td className="py-2 px-2">
                        <span className="text-green-400 cursor-pointer hover:underline" onClick={() => openReplay(winner.video, winner.matchId)}>
                          {winner.prize}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Prize Tiers */}
        <div className="bg-black/30 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
          <h3 className="font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            Prize Tiers
          </h3>
          <p className="text-xs text-gray-400 mb-3 sm:mb-4">Defined per room - reference for admin</p>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-300">
            <li><strong className="text-blue-400">$1 room:</strong> 1st $80 / 2nd $6 / 3rd $4</li>
            <li><strong className="text-blue-400">$5 room:</strong> 1st $400 / 2nd $30 / 3rd $20</li>
            <li><strong className="text-blue-400">$10 room:</strong> 1st $800 / 2nd $60 / 3rd $40</li>
            <li><strong className="text-blue-400">$15 room:</strong> 1st $1,200 / 2nd $90 / 3rd $60</li>
            <li><strong className="text-blue-400">$20 room:</strong> 1st $1,600 / 2nd $120 / 3rd $80</li>
          </ul>
        </div>
      </aside>
    </motion.div>
  );
}

// ------------------------ PLAYER VIEW ------------------------
function PlayerView({ player, matches, selectedMatch, goToDashboard, viewMatch, openReplay }) {
  if (!player) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4"
    >
      {/* Back & Profile */}
      <div className="bg-black/30 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 mb-4 sm:mb-6">
        <button onClick={goToDashboard} className="text-blue-400 hover:underline mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
          Back to Dashboard
        </button>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-bold flex-shrink-0">
            {player.username.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 space-y-1">
            <div className="font-bold text-lg sm:text-xl">{player.username}</div>
            <div className="text-xs sm:text-sm text-gray-400">Player ID: {player.id}</div>
            <div className="text-xs sm:text-sm text-gray-400">Registered: {player.registered}</div>
            <div className="text-xs sm:text-sm text-gray-400">Status: {player.status}</div>
            <div className="text-xs sm:text-sm text-gray-400">Last Seen: {player.lastSeen}</div>
          </div>
        </div>
      </div>

      {/* Matches */}
      <div className="bg-black/30 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
        <h3 className="font-bold mb-2 text-sm sm:text-base">Match History</h3>
        <ul className="space-y-2">
          {matches.map((match, i) => (
            <li key={match.matchId} className="flex justify-between items-center border-b border-white/10 py-2">
              <div className="text-xs sm:text-sm">
                {match.matchId} | {match.room} | {match.date}
              </div>
              <button
                className="text-blue-400 hover:underline text-xs sm:text-sm flex items-center gap-1"
                onClick={() => viewMatch(match.matchId)}
              >
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" /> Replay
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Selected Match Events */}
      {selectedMatch && (
        <div className="bg-black/30 backdrop-blur-lg rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10 mt-4 sm:mt-6">
          <h3 className="font-bold mb-2 text-sm sm:text-base">Match Events ({selectedMatch.matchId})</h3>
          <ul className="space-y-1 text-xs sm:text-sm text-gray-300">
            {selectedMatch.events.map((ev, i) => (
              <li key={i}>
                <span className="text-gray-400">{ev.t}</span> - {ev.e}
              </li>
            ))}
          </ul>
          <button
            onClick={() => openReplay(selectedMatch.video, selectedMatch.matchId)}
            className="mt-3 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold"
          >
            View Replay Video
          </button>
        </div>
      )}
    </motion.div>
  );
}

// ------------------------ MAIN GAME ADMIN ------------------------
export default function GameAdmin() {
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' or 'player'
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [replayModal, setReplayModal] = useState({ open: false, video: '', matchId: '' });

  const goToPlayer = (playerId) => {
    const player = DB.players[playerId];
    if (player) {
      setSelectedPlayer(player);
      setSelectedMatch(null);
      setCurrentView('player');
    }
  };

  const goToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedPlayer(null);
    setSelectedMatch(null);
  };

  const viewMatch = (matchId) => {
    const match = DB.matches.find(m => m.matchId === matchId);
    if (match) setSelectedMatch(match);
  };

  const handleSearch = () => {
    if (!searchQuery) return;
    const player = DB.players[searchQuery];
    if (player) setSearchResult(player);
    else setSearchResult(null);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResult(null);
  };

  const openReplay = (video, matchId) => {
    setReplayModal({ open: true, video, matchId });
  };

  const closeReplay = () => {
    setReplayModal({ open: false, video: '', matchId: '' });
  };

  return (
    <div className="p-4 sm:p-6 text-white min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {currentView === 'dashboard' ? (
        <DashboardView
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResult={searchResult}
          handleSearch={handleSearch}
          clearSearch={clearSearch}
          goToPlayer={goToPlayer}
          openReplay={openReplay}
        />
      ) : (
        <PlayerView
          player={selectedPlayer}
          matches={DB.matches.filter(m => m.playerId === selectedPlayer?.id)}
          selectedMatch={selectedMatch}
          goToDashboard={goToDashboard}
          viewMatch={viewMatch}
          openReplay={openReplay}
        />
      )}

      {/* Replay Modal */}
      <AnimatePresence>
        {replayModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-black/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-3xl w-full relative"
            >
              <button
                onClick={closeReplay}
                className="absolute top-3 right-3 text-red-500 hover:text-red-400"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-bold mb-2 text-sm sm:text-base">Match Replay ({replayModal.matchId})</h3>
              <div className="w-full h-64 sm:h-96 bg-gray-800 flex items-center justify-center rounded-lg">
                <img src={replayModal.video} alt="Replay" className="object-contain w-full h-full rounded-lg" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
