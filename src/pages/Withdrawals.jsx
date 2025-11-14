import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, CheckCircle, XCircle, Clock, Filter, Search, CreditCard, Building2, Wallet, Bitcoin } from 'lucide-react';

const methods = ['bank', 'card', 'crypto', 'e-wallet'];
const statuses = ['pending', 'approved', 'declined'];

const methodIcons = {
  bank: Building2,
  card: CreditCard,
  crypto: Bitcoin,
  'e-wallet': Wallet
};

const generateData = () => {
  const data = [];
  for (let i = 1; i <= 87839; i++) {
    const userName = 'User' + i;
    const amount = (Math.random() * 5000 + 10).toFixed(2);
    const method = methods[Math.floor(Math.random() * methods.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const tx = method.toUpperCase().slice(0, 3) + '-' + Math.floor(100000 + Math.random() * 900000);
    data.push({ id: i, user: userName, amount: parseFloat(amount), method: method, tx: tx, status: status });
  }
  return data;
};

export default function Withdrawals() {
    const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [methodFilter, setMethodFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;

  useEffect(() => {
    setData(generateData());
  }, []);

  const filteredData = useMemo(() => {
    return data
      .filter(row => (statusFilter ? row.status === statusFilter : true))
      .filter(row => (methodFilter ? row.method === methodFilter : true))
      .filter(row => {
        if (!searchQuery) return true;
        return row.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
               row.tx.toLowerCase().includes(searchQuery.toLowerCase()) ||
               row.id.toString().includes(searchQuery);
      });
  }, [data, statusFilter, methodFilter, searchQuery]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const stats = useMemo(() => {
    const pending = data.filter(d => d.status === 'pending').length;
    const approved = data.filter(d => d.status === 'approved').length;
    const declined = data.filter(d => d.status === 'declined').length;
    const totalAmount = data.reduce((sum, d) => sum + d.amount, 0);
    return { pending, approved, declined, totalAmount };
  }, [data]);

  const handleApprove = (id) => {
    const item = data.find(d => d.id === id);
    if (item && window.confirm(`Approve withdrawal for ${item.user}?`)) {
      setData(prev => prev.map(d => d.id === id ? { ...d, status: 'approved' } : d));
    }
  };

  const handleDecline = (id) => {
    const item = data.find(d => d.id === id);
    if (item && window.confirm(`Decline withdrawal for ${item.user}?`)) {
      setData(prev => prev.map(d => d.id === id ? { ...d, status: 'declined' } : d));
    }
  };

  const handleBack = () => {
   navigate('/home');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'approved': return 'text-green-400 bg-green-400/10';
      case 'declined': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-xl mb-2">
                1M
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-center">Withdrawals Admin</h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage withdrawal requests</p>
            </motion.div>

            <div className="w-20 sm:w-24"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-400">Pending</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">{stats.pending.toLocaleString()}</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Approved</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{stats.approved.toLocaleString()}</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-red-400" />
              <span className="text-sm text-gray-400">Declined</span>
            </div>
            <div className="text-2xl font-bold text-red-400">{stats.declined.toLocaleString()}</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <DollarSign className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Total Volume</span>
            </div>
            <div className="text-lg font-bold text-blue-400">${stats.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/10 mb-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by ID, User, or Transaction..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="declined">Declined</option>
            </select>

            <select
              value={methodFilter}
              onChange={(e) => {
                setMethodFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Methods</option>
              <option value="bank">Bank Transfer</option>
              <option value="card">Card</option>
              <option value="crypto">Crypto</option>
              <option value="e-wallet">E-Wallet</option>
            </select>
          </div>
          
          <div className="mt-3 text-sm text-gray-400">
            Showing {paginatedData.length} of {filteredData.length.toLocaleString()} results
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/30 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/40">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Method</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode="popLayout">
                  {paginatedData.map((row, index) => {
                    const MethodIcon = methodIcons[row.method];
                    return (
                      <motion.tr
                        key={row.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.02 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm font-medium">#{row.id}</td>
                        <td className="px-4 py-3 text-sm">{row.user}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-green-400">${row.amount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <MethodIcon className="w-4 h-4 text-blue-400" />
                            <span className="capitalize">{row.method}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-mono text-gray-300">{row.tx}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(row.status)}`}>
                            {row.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {row.status === 'pending' ? (
                            <div className="flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleApprove(row.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors"
                              >
                                Approve
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDecline(row.id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-semibold transition-colors"
                              >
                                Decline
                              </motion.button>
                            </div>
                          ) : (
                            <span className="text-gray-500 italic text-xs">No Action</span>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-black/40 px-4 py-3 flex items-center justify-between border-t border-white/5">
              <div className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-sm font-semibold transition-colors"
                >
                  Previous
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-sm font-semibold transition-colors"
                >
                  Next
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
