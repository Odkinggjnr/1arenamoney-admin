import React, { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Chart from "chart.js/auto";

export default function RevenueOverview() {
  const monthlyRef = useRef(null);
  const regionRef = useRef(null);
  const roomRef = useRef(null);

  const monthlyChartRef = useRef(null);
  const regionChartRef = useRef(null);
  const roomChartRef = useRef(null);

  useEffect(() => {
    if (monthlyChartRef.current) monthlyChartRef.current.destroy();
    if (regionChartRef.current) regionChartRef.current.destroy();
    if (roomChartRef.current) roomChartRef.current.destroy();

    // Monthly Revenue Chart
    monthlyChartRef.current = new Chart(monthlyRef.current, {
      type: "line",
      data: {
        labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
        datasets: [{
          label: "Revenue ($)",
          data: [80000, 90000, 95000, 120000, 110000, 125000, 130000, 135000, 140000, 150000, 160000, 175000],
          backgroundColor: "rgba(248,196,0,0.2)",
          borderColor: "rgba(248,196,0,1)",
          borderWidth: 2,
          tension: 0.3,
          fill: true,
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
    });

    // Revenue by Region Chart
    regionChartRef.current = new Chart(regionRef.current, {
      type: "doughnut",
      data: {
        labels: ["Europe", "Asia", "Africa", "America", "Other"],
        datasets: [{
          label: "Revenue by Region",
          data: [35, 30, 15, 15, 5],
          backgroundColor: [
            "rgba(248,196,0,0.8)",
            "rgba(0,123,255,0.8)",
            "rgba(40,167,69,0.8)",
            "rgba(255,193,7,0.8)",
            "rgba(220,53,69,0.8)"
          ]
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });

    // Revenue by Room Chart
    roomChartRef.current = new Chart(roomRef.current, {
      type: "bar",
      data: {
        labels: ["$1 Room", "$5 Room", "$10 Room", "$15 Room", "$20 Room"],
        datasets: [{
          label: "Revenue ($)",
          data: [150000, 250000, 300000, 200000, 350000],
          backgroundColor: [
            "rgba(248,196,0,0.8)",
            "rgba(0,123,255,0.8)",
            "rgba(40,167,69,0.8)",
            "rgba(255,193,7,0.8)",
            "rgba(220,53,69,0.8)"
          ],
          borderWidth: 1
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
    });

    return () => {
      if (monthlyChartRef.current) monthlyChartRef.current.destroy();
      if (regionChartRef.current) regionChartRef.current.destroy();
      if (roomChartRef.current) roomChartRef.current.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[url('https://i.supaimg.com/f27c6130-082e-4bfc-abc0-f58d684717f3.png')] bg-cover bg-center text-white font-inter">
      {/* Header */}
      <header className="bg-[rgba(3,16,37,0.9)] flex items-center justify-center p-6 relative">
        <img src="https://i.supaimg.com/42dbf38f-2696-4a9f-ae8a-f297b212233b.png" alt="Logo" className="h-16 mr-4" />
        <h1 className="text-2xl font-semibold">1MoneyArena Revenue</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="absolute left-6 top-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2 font-medium"
          onClick={() => window.location.href="superadmin.html"}
        >
          <ArrowLeft size={18} /> Back
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Total Revenue */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[rgba(3,16,37,0.85)] rounded-xl shadow-lg p-6"
        >
          <h2 className="text-yellow-400 text-2xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold">$1,250,000</p>
        </motion.section>

        {/* Grid layout for charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[rgba(3,16,37,0.85)] rounded-xl shadow-lg p-6 h-64"
          >
            <h2 className="text-yellow-400 text-2xl font-semibold mb-4">Monthly Revenue</h2>
            <div className="w-full h-full">
              <canvas ref={monthlyRef} className="w-full h-full"></canvas>
            </div>
          </motion.section>

          {/* Revenue by Region */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-[rgba(3,16,37,0.85)] rounded-xl shadow-lg p-6 h-64"
          >
            <h2 className="text-yellow-400 text-2xl font-semibold mb-4">Revenue by Region</h2>
            <div className="w-full h-full">
              <canvas ref={regionRef} className="w-full h-full"></canvas>
            </div>
          </motion.section>
        </div>

        {/* Revenue by Room full width */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-[rgba(3,16,37,0.85)] rounded-xl shadow-lg p-6 h-64"
        >
          <h2 className="text-yellow-400 text-2xl font-semibold mb-4">Revenue by Room</h2>
          <div className="w-full h-full">
            <canvas ref={roomRef} className="w-full h-full"></canvas>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 bg-[rgba(3,16,37,0.9)]">
        &copy; 2025 1MoneyArena. All rights reserved.
      </footer>
    </div>
  );
}
