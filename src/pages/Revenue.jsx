import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, DollarSign, Globe, Users } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 80000 },
  { month: 'Feb', revenue: 90000 },
  { month: 'Mar', revenue: 95000 },
  { month: 'Apr', revenue: 120000 },
  { month: 'May', revenue: 110000 },
  { month: 'Jun', revenue: 125000 },
  { month: 'Jul', revenue: 130000 },
  { month: 'Aug', revenue: 135000 },
  { month: 'Sep', revenue: 140000 },
  { month: 'Oct', revenue: 150000 },
  { month: 'Nov', revenue: 160000 },
  { month: 'Dec', revenue: 175000 }
];

const regionData = [
  { name: 'Europe', value: 35, color: '#f8c400' },
  { name: 'Asia', value: 30, color: '#007bff' },
  { name: 'Africa', value: 15, color: '#28a745' },
  { name: 'America', value: 15, color: '#ffc107' },
  { name: 'Other', value: 5, color: '#dc3545' }
];

const roomData = [
  { room: '$1 Room', revenue: 150000, color: '#f8c400' },
  { room: '$5 Room', revenue: 250000, color: '#007bff' },
  { room: '$10 Room', revenue: 300000, color: '#28a745' },
  { room: '$15 Room', revenue: 200000, color: '#ffc107' },
  { room: '$20 Room', revenue: 350000, color: '#dc3545' }
];

const COLORS = ['#f8c400', '#007bff', '#28a745', '#ffc107', '#dc3545'];

export default function RevenueDashboard() {
  const navigate = useNavigate();
  const [totalRevenue] = useState(1250000);

  const handleBack = () => {
    navigate('/home');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
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
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center font-bold text-xl ml-8">
                1M
              </div>
              <h1 className="text-xl font-bold">1MoneyArena Revenue</h1>
            </motion.div>

            <div className="w-20 sm:w-24"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Total Revenue Card */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 sm:p-8 shadow-2xl border border-yellow-400/20">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-6 h-6" />
                    <h2 className="text-lg sm:text-xl font-semibold">Total Revenue</h2>
                  </div>
                  <motion.p
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-3xl sm:text-5xl font-bold"
                  >
                    {formatCurrency(totalRevenue)}
                  </motion.p>
                </div>
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <TrendingUp className="w-16 h-16 sm:w-20 sm:h-20 opacity-30" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Monthly Revenue Chart */}
          <motion.div variants={itemVariants}>
            <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                <h2 className="text-xl sm:text-2xl font-semibold">Monthly Revenue</h2>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#fff"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#fff"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => formatCurrency(value)}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#f8c400" 
                    strokeWidth={3}
                    dot={{ fill: '#f8c400', r: 5 }}
                    activeDot={{ r: 8 }}
                    name="Revenue ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue by Region */}
            <motion.div variants={itemVariants}>
              <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl sm:text-2xl font-semibold">Revenue by Region</h2>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => `${value}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Revenue by Room */}
            <motion.div variants={itemVariants}>
              <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5 text-green-400" />
                  <h2 className="text-xl sm:text-2xl font-semibold">Revenue by Room</h2>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={roomData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="room" 
                      stroke="#fff"
                      style={{ fontSize: '11px' }}
                      angle={-15}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      stroke="#fff"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(0,0,0,0.8)', 
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                      {roomData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/10"
              >
                <div className="text-gray-400 text-sm mb-1">Avg. Monthly</div>
                <div className="text-xl sm:text-2xl font-bold text-yellow-400">
                  {formatCurrency(totalRevenue / 12)}
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/10"
              >
                <div className="text-gray-400 text-sm mb-1">Top Room</div>
                <div className="text-xl sm:text-2xl font-bold text-red-400">
                  $20 Room
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/10"
              >
                <div className="text-gray-400 text-sm mb-1">Top Region</div>
                <div className="text-xl sm:text-2xl font-bold text-yellow-400">
                  Europe
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-black/30 backdrop-blur-lg rounded-xl p-4 border border-white/10"
              >
                <div className="text-gray-400 text-sm mb-1">Growth</div>
                <div className="text-xl sm:text-2xl font-bold text-green-400">
                  +118%
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 mt-12 py-6 text-center">
        <p className="text-gray-400">&copy; 2025 1MoneyArena. All rights reserved.</p>
      </footer>
    </div>
  );
}
