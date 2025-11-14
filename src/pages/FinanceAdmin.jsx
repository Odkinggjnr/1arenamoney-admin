import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; 
import { 
  ArrowLeft, DollarSign, TrendingUp, AlertTriangle, CreditCard, 
  FileText, Shield, Gift, CheckCircle, XCircle, Clock, Search,
  Download, RefreshCw, Users, Calendar, Database
} from 'lucide-react';

const initialWithdrawals = [
  { id: 1, user: 'Michael', amount: 250, status: 'pending' },
  { id: 2, user: 'Samuel', amount: 410, status: 'completed' },
  { id: 3, user: 'Emma', amount: 180, status: 'pending' },
  { id: 4, user: 'Jackson', amount: 320, status: 'completed' }
];

const deposits = [
  { id: 'D1', user: 'LunaBlade', amount: 500, status: 'completed' },
  { id: 'D2', user: 'DarkPulse', amount: 120, status: 'failed' },
  { id: 'D3', user: 'ShadowFox', amount: 350, status: 'completed' },
  { id: 'D4', user: 'NeonKnight', amount: 200, status: 'pending' }
];

const highValueTxns = [
  { id: 'HV001', user: 'VenusStorm', amount: 5000, status: 'pending' },
  { id: 'HV002', user: 'TitanRage', amount: 7500, status: 'pending' },
  { id: 'HV003', user: 'PhoenixWing', amount: 6200, status: 'hold' }
];

export default function FinanceAdmin() {
    const navigate = useNavigate();

  const [withdrawals, setWithdrawals] = useState(initialWithdrawals);
  const [reportType, setReportType] = useState('Daily Report');
  const [fraudSearch, setFraudSearch] = useState('');
  const [gateway, setGateway] = useState('PayPal');
  const [userId, setUserId] = useState('');
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustType, setAdjustType] = useState('Refund');
  const [promoCode, setPromoCode] = useState('');
  const [bonusAmount, setBonusAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleBack = () => {
   navigate('/home')
  };

  const handleApprove = (id) => {
    setWithdrawals(prev => 
      prev.map(w => w.id === id ? { ...w, status: 'completed' } : w)
    );
  };

  const handleDecline = (id) => {
    setWithdrawals(prev => 
      prev.map(w => w.id === id ? { ...w, status: 'declined' } : w)
    );
  };

  const getStatusBadge = (status) => {
    const configs = {
      completed: { color: 'text-green-400 bg-green-400/10', icon: CheckCircle },
      pending: { color: 'text-yellow-400 bg-yellow-400/10', icon: Clock },
      failed: { color: 'text-red-400 bg-red-400/10', icon: XCircle },
      declined: { color: 'text-red-400 bg-red-400/10', icon: XCircle },
      hold: { color: 'text-orange-400 bg-orange-400/10', icon: AlertTriangle }
    };
    const config = configs[status] || configs.pending;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.color}`}>
        <Icon className="w-3 h-3" />
        {status.toUpperCase()}
      </span>
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
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
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer mr-10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center font-bold text-xl ml-8">
                1M
              </div>
              <h1 className="text-sm sm:text-xl font-bold uppercase tracking-wider text-cyan-400">
                Finance Admin Panel
              </h1>
            </motion.div>

            <div className="w-20 sm:w-24"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold text-cyan-400 mb-6"
        >
          Finance Dashboard
        </motion.h2>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            { title: 'Total Revenue', value: '$182,340', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
            { title: 'Pending Withdrawals', value: '87,839', icon: Clock, color: 'from-yellow-500 to-orange-600' },
            { title: 'Total Deposits', value: '$412,670', icon: TrendingUp, color: 'from-blue-500 to-cyan-600' },
            { title: 'Active Transactions', value: '1,249', icon: CreditCard, color: 'from-purple-500 to-pink-600' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 shadow-lg border border-white/10`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="w-10 h-10 opacity-70" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Manage Withdrawals */}
          <motion.section variants={itemVariants} className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2 border-l-4 border-cyan-500 pl-3">
              <Users className="w-5 h-5" />
              Manage Withdrawals
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-cyan-400 text-sm uppercase">User</th>
                    <th className="text-left py-3 px-4 text-cyan-400 text-sm uppercase">Amount</th>
                    <th className="text-left py-3 px-4 text-cyan-400 text-sm uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-cyan-400 text-sm uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((w) => (
                    <motion.tr 
                      key={w.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-4">{w.user}</td>
                      <td className="py-3 px-4 font-semibold text-green-400">${w.amount}</td>
                      <td className="py-3 px-4">{getStatusBadge(w.status)}</td>
                      <td className="py-3 px-4">
                        {w.status === 'pending' ? (
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleApprove(w.id)}
                              className="bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                            >
                              Approve
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDecline(w.id)}
                              className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors"
                            >
                              Decline
                            </motion.button>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm italic">No Action</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Monitor Deposits */}
          <motion.section variants={itemVariants} className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2 border-l-4 border-cyan-500 pl-3">
              <TrendingUp className="w-5 h-5" />
              Monitor Deposits
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-cyan-400 text-sm uppercase">ID</th>
                    <th className="text-left py-3 px-4 text-cyan-400 text-sm uppercase">User</th>
                    <th className="text-left py-3 px-4 text-cyan-400 text-sm uppercase">Amount</th>
                    <th className="text-left py-3 px-4 text-cyan-400 text-sm uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {deposits.map((d) => (
                    <tr key={d.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-mono">#{d.id}</td>
                      <td className="py-3 px-4">{d.user}</td>
                      <td className="py-3 px-4 font-semibold text-green-400">${d.amount}</td>
                      <td className="py-3 px-4">{getStatusBadge(d.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>

          {/* Generate Reports */}
          <motion.section variants={itemVariants} className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2 border-l-4 border-cyan-500 pl-3">
              <FileText className="w-5 h-5" />
              Generate Reports
            </h3>
            <div className="flex flex-wrap gap-3">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="bg-black/40 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option>Daily Report</option>
                <option>Weekly Report</option>
                <option>Monthly Report</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Generate
              </motion.button>
            </div>
          </motion.section>

          {/* Fraud Detection */}
          <motion.section variants={itemVariants} className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2 border-l-4 border-cyan-500 pl-3">
              <Shield className="w-5 h-5" />
              Fraud Detection
            </h3>
            <div className="flex flex-wrap gap-3">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={fraudSearch}
                  onChange={(e) => setFraudSearch(e.target.value)}
                  placeholder="Search User / Transaction ID"
                  className="w-full bg-black/40 border border-white/20 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <AlertTriangle className="w-4 h-4" />
                Scan
              </motion.button>
            </div>
          </motion.section>

          {/* Payment Gateways */}
          <motion.section variants={itemVariants} className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2 border-l-4 border-cyan-500 pl-3">
              <CreditCard className="w-5 h-5" />
              Payment Gateways
            </h3>
            <div className="flex flex-wrap gap-3">
              <select
                value={gateway}
                onChange={(e) => setGateway(e.target.value)}
                className="bg-black/40 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option>PayPal</option>
                <option>Stripe</option>
                <option>Crypto Wallet</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Check Status
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                Reconnect
              </motion.button>
            </div>
          </motion.section>

          {/* Refunds & Balance Adjustments */}
          <motion.section variants={itemVariants} className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2 border-l-4 border-cyan-500 pl-3">
              <DollarSign className="w-5 h-5" />
              Refunds & Balance Adjustments
            </h3>
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="User ID"
                className="bg-black/40 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 min-w-[150px]"
              />
              <input
                type="number"
                value={adjustAmount}
                onChange={(e) => setAdjustAmount(e.target.value)}
                placeholder="Amount"
                className="bg-black/40 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 min-w-[120px]"
              />
              <select
                value={adjustType}
                onChange={(e) => setAdjustType(e.target.value)}
                className="bg-black/40 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option>Refund</option>
                <option>Adjust Balance</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Submit
              </motion.button>
            </div>
          </motion.section>

          {/* Bonuses & Promotions */}
          <motion.section variants={itemVariants} className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2 border-l-4 border-cyan-500 pl-3">
              <Gift className="w-5 h-5" />
              Bonuses & Promotions
            </h3>
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promotion Code"
                className="bg-black/40 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 min-w-[150px]"
              />
              <input
                type="number"
                value={bonusAmount}
                onChange={(e) => setBonusAmount(e.target.value)}
                placeholder="Bonus Amount"
                className="bg-black/40 border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 min-w-[120px]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Gift className="w-4 h-4" />
                Add Bonus
              </motion.button>
            </div>
          </motion.section>

          {/* High-Value Transactions */}
          <motion.section variants={itemVariants} className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold text-blue-400 mb-4 flex items-center gap-2 border-l-4 border-cyan-500 pl-3">
              <AlertTriangle className="w-5 h-5" />
              High-Value Transactions
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-cyan-400 text-sm uppercase">ID</th>
                    <th className="text-left py-3 px-4 text-cyan-400 text-sm uppercase">User</th>
                    <th className="text-left py-3 px-4 text-cyan-400 text-sm uppercase">Amount</th>
                    <th className="text-left py-3 px-4 text-cyan-400 text-sm uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {highValueTxns.map((txn) => (
                    <tr key={txn.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-mono">{txn.id}</td>
                      <td className="py-3 px-4">{txn.user}</td>
                      <td className="py-3 px-4 font-semibold text-green-400">${txn.amount}</td>
                      <td className="py-3 px-4">{getStatusBadge(txn.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
