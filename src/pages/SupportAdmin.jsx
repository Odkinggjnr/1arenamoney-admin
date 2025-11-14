import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send, User, MessageCircle, Clock, Search, X, ArrowLeft } from 'lucide-react';

const initialClients = [
  { id: 1, name: 'John Doe', messages: [{ from: 'client', text: 'Hello!', time: '10:30 AM' }], unread: 0 },
  { id: 2, name: 'Jane Smith', messages: [{ from: 'client', text: 'I need help with my deposit.', time: '10:32 AM' }], unread: 1 },
  { id: 3, name: 'Alex Lee', messages: [{ from: 'client', text: 'How to withdraw winnings?', time: '10:35 AM' }], unread: 1 },
  { id: 4, name: 'Sarah Connor', messages: [{ from: 'client', text: 'Account verification issue', time: '10:40 AM' }], unread: 0 },
  { id: 5, name: 'Mike Johnson', messages: [{ from: 'client', text: 'Bonus not credited', time: '10:45 AM' }], unread: 2 }
];

const randomMessages = [
  "Hello, I need help.",
  "My deposit didn't go through.",
  "Can you check my withdrawal?",
  "I forgot my password.",
  "How do I claim my bonus?",
  "Is my account verified?",
  "Why is my transaction pending?",
  "Can you help me with KYC?",
  "Payment method not working",
  "How long does withdrawal take?"
];

export default function SupportAdmin() {
    const navigate = useNavigate();

  const [clients, setClients] = useState(initialClients);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  const selectedClient = clients.find(c => c.id === selectedClientId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedClient?.messages]);

  // Simulate incoming messages
  useEffect(() => {
    const interval = setInterval(() => {
      const randomClient = clients[Math.floor(Math.random() * clients.length)];
      const randomText = randomMessages[Math.floor(Math.random() * randomMessages.length)];
      const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      
      setClients(prev => prev.map(client => {
        if (client.id === randomClient.id) {
          return {
            ...client,
            messages: [...client.messages, { from: 'client', text: randomText, time: currentTime }],
            unread: client.id === selectedClientId ? 0 : client.unread + 1
          };
        }
        return client;
      }));
    }, Math.floor(Math.random() * 7000) + 5000);

    return () => clearInterval(interval);
  }, [clients, selectedClientId]);

  const handleSelectClient = (id) => {
    setSelectedClientId(id);
    setClients(prev => prev.map(client => 
      client.id === id ? { ...client, unread: 0 } : client
    ));
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedClientId) return;
    
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    setClients(prev => prev.map(client => {
      if (client.id === selectedClientId) {
        return {
          ...client,
          messages: [...client.messages, { from: 'admin', text: messageInput, time: currentTime }]
        };
      }
      return client;
    }));
    
    setMessageInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

    const handleBack = () => {
        navigate('/home');
    };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnread = clients.reduce((sum, client) => sum + client.unread, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
  <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
    
    {/* Back Button */}
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
      onClick={handleBack}
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="hidden sm:inline">Back</span>
    </motion.button>

    {/* Title */}
    <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider   text-cyan-400 text-center flex-1">
             Support Admin
    </h1>

    {/* Placeholder to keep center alignment */}
                      <div className="w-32"></div>
                         </div>
                        </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-80 bg-black/30 backdrop-blur-lg border-r border-white/10 flex flex-col"
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Clients
              </h2>
              {totalUnread > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                >
                  {totalUnread}
                </motion.span>
              )}
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients..."
                className="w-full bg-black/40 border border-white/20 rounded-lg pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Client List */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
              {filteredClients.map((client, index) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelectClient(client.id)}
                  className={`p-4 border-b border-white/5 cursor-pointer transition-all ${
                    selectedClientId === client.id 
                      ? 'bg-cyan-500/20 border-l-4 border-l-cyan-500' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold">{client.name}</div>
                        <div className="text-xs text-gray-400 truncate max-w-[150px]">
                          {client.messages[client.messages.length - 1]?.text}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-gray-400">
                        {client.messages[client.messages.length - 1]?.time}
                      </span>
                      {client.unread > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                        >
                          {client.unread}
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-black/20">
          {selectedClient ? (
            <>
              {/* Chat Header */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-black/30 backdrop-blur-lg border-b border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-cyan-400">{selectedClient.name}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Online
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                <AnimatePresence>
                  {selectedClient.messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className={`flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                          msg.from === 'admin'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 ml-auto'
                            : 'bg-white/10 backdrop-blur-sm'
                        }`}
                      >
                        <div className="text-sm">{msg.text}</div>
                        <div className="text-xs opacity-70 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {msg.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-black/30 backdrop-blur-lg border-t border-white/10"
              >
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 bg-black/40 border border-white/20 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSendMessage}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg shadow-cyan-500/30"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <MessageCircle className="w-10 h-10" />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No Chat Selected</h3>
                <p className="text-gray-500">Select a client from the list to start chatting</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
