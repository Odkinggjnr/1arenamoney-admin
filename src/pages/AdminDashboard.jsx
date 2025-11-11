import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  Crown, 
  Users, 
  Settings, 
  Search,
  Database,
  RefreshCw,
  Wrench
} from 'lucide-react';

// Generate random members
const generateMembers = (count) => {
  const firstNames = ["Alpha","Beta","Gamma","Delta","Nova","Cyber","Shadow","Iron","Jet","Omega","Star","Luna","Pixel","Neo","Dark","Blaze","Venus","Galaxy","Hydra","Quantum"];
  const lastNames = ["Rider","Hunter","Storm","Blade","Knight","Fox","Bolt","Jet","King","Master","Wolf","Dragon","Hawk","Phoenix","Pulse","Edge","Force","Soul","Titan","Fire"];
  const domains = ["gmail.com","yahoo.com","outlook.com","protonmail.com","hotmail.com"];
  const statuses = ["live","waiting"];
  
  const members = [];
  for(let i = 1; i <= count; i++){
    const username = firstNames[Math.floor(Math.random() * firstNames.length)] + 
                    lastNames[Math.floor(Math.random() * lastNames.length)];
    const email = username.toLowerCase() + "@" + domains[Math.floor(Math.random() * domains.length)];
    const balance = Math.floor(Math.random() * 991) + 10;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    members.push({id: i, username, email, balance, status});
  }
  return members;
};

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [members] = useState(() => generateMembers(1000));
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'admins', label: 'Admins', icon: Crown },
    { id: 'members', label: 'All Members', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const adminRoles = [
    { role: 'Finance Admin', responsibilities: 'Handles money, transactions, and withdrawals.', page: 'financeadmin.html' },
    { role: 'Support Admin', responsibilities: 'Manages users, disputes, and support tickets.', page: 'supportadmin.html' },
    { role: 'Game Admin', responsibilities: 'Oversees matches, tournaments, and player management.', page: 'gameadmin.html' },
    { role: 'Moderator', responsibilities: 'Handles reports, chat moderation, and bans.', page: 'moderator.html' },
  ];

  const filteredMembers = useMemo(() => {
    if (!searchQuery) return members;
    const query = searchQuery.toLowerCase();
    return members.filter(m => 
      m.username.toLowerCase().includes(query) || 
      m.id.toString().includes(query)
    );
  }, [members, searchQuery]);

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpen(false);
  };

  const handleAction = (action) => {
    showToast(`${action} initiated successfully!`);
  };

  const handleCardClick = (path) => {
    if (path) {
      console.log(`Navigating to: ${path}`);
      showToast(`Navigating to ${path}`);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-cyan-950 text-white">
      {/* Custom Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-4 left-1/2 z-50 bg-linear-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl shadow-2xl shadow-cyan-500/50 font-medium"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10"
      >
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-cyan-500/20 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6 text-cyan-400" />}
          </button>
          
          <div className="flex flex-col items-center flex-1">
            <motion.img 
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png" 
              alt="Logo" 
              className="w-12 h-12 rounded-xl shadow-lg shadow-cyan-500/50"
            />
            <h1 className="text-sm md:text-lg font-bold text-cyan-400 tracking-wider mt-1 uppercase">
              1MoneyArena Admin
            </h1>
          </div>
          
          <div className="w-10"></div>
        </div>
      </motion.header>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.nav
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 left-0 h-full w-64 bg-slate-950/95 backdrop-blur-xl border-r border-white/10 shadow-2xl shadow-cyan-500/20 z-50 pt-20"
            >
              <ul className="space-y-1 px-3">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={item.id}
                      whileHover={{ x: 8 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <button
                        onClick={() => handleSectionChange(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          activeSection === item.id
                            ? 'bg-linear-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-l-4 border-cyan-400'
                            : 'text-slate-300 hover:bg-white/5 hover:text-cyan-400'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="p-4 md:p-8 lg:p-12">
        <AnimatePresence mode="wait">
          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <motion.section
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6 md:mb-8 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                Dashboard Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[ 
                  { title: 'Active Matches', value: '5 ongoing', color: 'from-cyan-500 to-blue-500', path: '/matches' },
                  { title: 'Players Online', value: '10,124 users', color: 'from-blue-500 to-purple-500', path: '/players' },
                  { title: 'Total Revenue', value: '$182,340', color: 'from-purple-500 to-pink-500', path: '/revenue' },
                  { title: 'Pending Withdrawals', value: '87,839 requests', color: 'from-pink-500 to-rose-500', path: '/withdrawals' },
                ].map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group cursor-pointer"
                  >
                    <Link
                      to={card.path}
                      onClick={() => showToast(`Navigating to ${card.title}`)}
                      className="absolute inset-0 z-10"
                    />
                    <div className="absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" 
                         style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.4), rgba(59,130,246,0.4))' }}
                    />
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-cyan-400/50 transition-all">
                      <h3 className={`text-lg font-semibold bg-clip-text text-transparent mb-2 bg-gradient-to-r ${card.color}`}>
                        {card.title}
                      </h3>
                      <p className="text-2xl md:text-3xl font-bold text-white">{card.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Admins Section */}
          {activeSection === 'admins' && (
            <motion.section
              key="admins"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6 md:mb-8 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                Manage Admins
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <table className="w-full">
                  <thead className="bg-cyan-950/30 border-b border-white/10">
                    <tr>
                      <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-cyan-400 uppercase tracking-wider">Role</th>
                      <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-cyan-400 uppercase tracking-wider hidden md:table-cell">Responsibilities</th>
                      <th className="px-4 py-4 text-right text-xs md:text-sm font-semibold text-cyan-400 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminRoles.map((admin, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-4 text-sm md:text-base font-medium text-white">{admin.role}</td>
                        <td className="px-4 py-4 text-sm text-slate-300 hidden md:table-cell">{admin.responsibilities}</td>
                        <td className="px-4 py-4 text-right">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAction(`Editing ${admin.role}`)}
                            className="px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl text-sm font-semibold shadow-lg hover:shadow-cyan-500/50 transition-all"
                          >
                            Edit
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.section>
          )}

          {/* Members Section */}
          {activeSection === 'members' && (
            <motion.section
              key="members"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6 md:mb-8 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                All Members
              </h2>
              
              <div className="mb-6 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-96 pl-12 pr-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                />
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm max-h-[600px] overflow-y-auto">
                <table className="w-full">
                  <thead className="bg-cyan-950/30 border-b border-white/10 sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-cyan-400 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-cyan-400 uppercase tracking-wider">Username</th>
                      <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-cyan-400 uppercase tracking-wider hidden md:table-cell">Email</th>
                      <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-cyan-400 uppercase tracking-wider">Balance</th>
                      <th className="px-4 py-4 text-left text-xs md:text-sm font-semibold text-cyan-400 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((member, idx) => (
                      <motion.tr
                        key={member.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: Math.min(idx * 0.01, 0.5) }}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-slate-300">#{member.id.toString().padStart(3, '0')}</td>
                        <td className="px-4 py-3 text-sm md:text-base font-medium text-white">{member.username}</td>
                        <td className="px-4 py-3 text-sm text-slate-300 hidden md:table-cell">{member.email}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-green-400">${member.balance}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                            member.status === 'live'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {member.status === 'live' ? 'Online' : 'Offline'}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <p className="text-slate-400 text-sm mt-4">
                Showing {filteredMembers.length} of {members.length} members
              </p>
            </motion.section>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <motion.section
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-6 md:mb-8 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                Settings
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'System Settings', description: 'Configure global system preferences', color: 'from-cyan-500 to-blue-500', icon: Wrench },
                  { title: 'Database', description: 'Manage and backup databases', color: 'from-purple-500 to-pink-500', icon: Database },
                  { title: 'Refresh Data', description: 'Update all platform metrics', color: 'from-green-500 to-teal-500', icon: RefreshCw },
                ].map((setting, idx) => {
                  const Icon = setting.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ y: -6, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative group p-6 md:p-8 bg-linear-to-br ${setting.color} rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
                      onClick={() => showToast(`${setting.title} clicked`)}
                    >
                      <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                      <div className="relative flex items-center gap-4">
                        <Icon className="w-8 h-8 text-white" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{setting.title}</h3>
                          <p className="text-sm text-white/70">{setting.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
