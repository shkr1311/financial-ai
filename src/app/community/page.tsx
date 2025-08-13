"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Users,
  MessageCircle,
  TrendingUp,
  ThumbsUp,
  Reply,
  Search,
  Plus,
  Award,
  Clock,
  Eye,
  ArrowLeft,
  Hash,
  Bookmark,
  Send,
  Smile,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
} from "lucide-react"

const discussionCategories = [
  { name: "Market Analysis", count: 234, color: "teal" },
  { name: "Trading Strategies", count: 189, color: "blue" },
  { name: "Technical Analysis", count: 156, color: "purple" },
  { name: "Options Trading", count: 98, color: "orange" },
  { name: "Crypto Discussion", count: 87, color: "green" },
  { name: "Beginner Help", count: 145, color: "pink" },
]

const topDiscussions = [
  {
    id: 1,
    title: "NIFTY 50 breakout pattern - What's your take?",
    author: "TradingPro_2024",
    replies: 23,
    views: 456,
    likes: 12,
    category: "Technical Analysis",
    timeAgo: "2h ago",
    isHot: true,
    tags: ["NIFTY", "Breakout", "Technical"],
  },
  {
    id: 2,
    title: "Best swing trading strategy for current market conditions?",
    author: "SwingMaster",
    replies: 18,
    views: 234,
    likes: 8,
    category: "Trading Strategies",
    timeAgo: "4h ago",
    isHot: false,
    tags: ["Swing Trading", "Strategy"],
  },
  {
    id: 3,
    title: "How to manage risk in volatile markets - Need advice",
    author: "NewTrader123",
    replies: 31,
    views: 567,
    likes: 15,
    category: "Beginner Help",
    timeAgo: "6h ago",
    isHot: true,
    tags: ["Risk Management", "Help"],
  },
]

const topContributors = [
  { name: "MarketGuru", reputation: 2450, badge: "Expert", posts: 156 },
  { name: "TechAnalyst", reputation: 1890, badge: "Pro", posts: 134 },
  { name: "OptionsKing", reputation: 1567, badge: "Pro", posts: 98 },
  { name: "CryptoSage", reputation: 1234, badge: "Advanced", posts: 87 },
]

const chatRooms = [
  { id: 1, name: "General Trading", members: 234, active: true },
  { id: 2, name: "Technical Analysis", members: 156, active: false },
  { id: 3, name: "Options & Futures", members: 89, active: false },
  { id: 4, name: "Crypto Corner", members: 67, active: false },
]

const onlineUsers = [
  { name: "TradingPro_2024", status: "online", avatar: "TP" },
  { name: "MarketGuru", status: "online", avatar: "MG" },
  { name: "SwingMaster", status: "away", avatar: "SM" },
  { name: "TechAnalyst", status: "online", avatar: "TA" },
  { name: "CryptoSage", status: "online", avatar: "CS" },
]

const chatMessages = [
  {
    id: 1,
    user: "MarketGuru",
    avatar: "MG",
    message: "NIFTY looking bullish today! Anyone else seeing the breakout pattern?",
    time: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    user: "TechAnalyst",
    avatar: "TA",
    message: "Yes! Volume confirmation is strong. Target could be 24,800",
    time: "10:32 AM",
    isOwn: false,
  },
  {
    id: 3,
    user: "You",
    avatar: "YU",
    message: "Thanks for the insight! What's your stop loss strategy?",
    time: "10:35 AM",
    isOwn: true,
  },
  {
    id: 4,
    user: "SwingMaster",
    avatar: "SM",
    message: "I'm keeping SL at 24,200. Risk-reward looks good from here",
    time: "10:37 AM",
    isOwn: false,
  },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedChatRoom, setSelectedChatRoom] = useState(1)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const renderChatContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Chat Rooms Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        <div className="glass p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Chat Rooms</h3>
          <div className="space-y-2">
            {chatRooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedChatRoom(room.id)}
                className={`w-full p-3 rounded-lg text-left transition-colors ${
                  selectedChatRoom === room.id ? "bg-teal-500/20 border border-teal-400/30" : "hover:bg-slate-700/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{room.name}</span>
                  {room.active && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
                </div>
                <div className="text-slate-400 text-sm">{room.members} members</div>
              </button>
            ))}
          </div>
        </div>

        <div className="glass p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-white mb-4">Online Now ({onlineUsers.length})</h3>
          <div className="space-y-3">
            {onlineUsers.map((user) => (
              <div key={user.name} className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-xs">
                    {user.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-800 ${
                      user.status === "online" ? "bg-green-400" : "bg-yellow-400"
                    }`}
                  ></div>
                </div>
                <span className="text-slate-300 text-sm">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-3">
        <div className="glass rounded-xl overflow-hidden h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <h3 className="text-white font-semibold">
                {chatRooms.find((room) => room.id === selectedChatRoom)?.name}
              </h3>
              <span className="text-slate-400 text-sm">
                {chatRooms.find((room) => room.id === selectedChatRoom)?.members} members
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                <Phone className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                <Video className="w-5 h-5 text-slate-400" />
              </button>
              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.map((message) => (
              <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex space-x-3 max-w-xs lg:max-w-md ${message.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-xs flex-shrink-0">
                    {message.avatar}
                  </div>
                  <div>
                    <div
                      className={`p-3 rounded-xl ${
                        message.isOwn ? "bg-teal-500 text-white" : "bg-slate-700 text-slate-100"
                      }`}
                    >
                      {!message.isOwn && <div className="text-xs text-slate-300 mb-1 font-medium">{message.user}</div>}
                      <div className="text-sm">{message.message}</div>
                    </div>
                    <div className={`text-xs text-slate-400 mt-1 ${message.isOwn ? "text-right" : "text-left"}`}>
                      {message.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center space-x-3">
              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                <Paperclip className="w-5 h-5 text-slate-400" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                />
              </div>
              <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors">
                <Smile className="w-5 h-5 text-slate-400" />
              </button>
              <button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white p-3 rounded-xl hover:from-teal-600 hover:to-cyan-600 transition-all"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
              <span className="text-slate-300 hover:text-white transition-colors">Back to Platform</span>
            </Link>

            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-teal-400" />
              <span className="text-xl font-bold text-white">Community Hub</span>
            </div>

            <Link href="/signin" className="text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Traders' <span className="text-teal-400">Community Hub</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Connect, collaborate, and learn from fellow traders. Share strategies, solve doubts, and grow together.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="glass p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-teal-400">2.5K+</div>
                <div className="text-slate-400 text-sm">Active Traders</div>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-cyan-400">1.2K+</div>
                <div className="text-slate-400 text-sm">Discussions</div>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-400">850+</div>
                <div className="text-slate-400 text-sm">Strategies Shared</div>
              </div>
              <div className="glass p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-purple-400">95%</div>
                <div className="text-slate-400 text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              {activeTab !== "chat" && (
                <div className="lg:col-span-1 space-y-6">
                  {/* Categories */}
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-4">Discussion Categories</h3>
                    <div className="space-y-3">
                      {discussionCategories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => setSelectedCategory(category.name.toLowerCase())}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors text-left"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full bg-${category.color}-400`}></div>
                            <span className="text-slate-300">{category.name}</span>
                          </div>
                          <span className="text-slate-500 text-sm">{category.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Top Contributors */}
                  <div className="glass p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-4">Top Contributors</h3>
                    <div className="space-y-4">
                      {topContributors.map((contributor, index) => (
                        <div key={contributor.name} className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full flex items-center justify-center text-slate-900 font-bold text-sm">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-medium">{contributor.name}</div>
                            <div className="flex items-center space-x-2 text-xs">
                              <span className="text-teal-400">{contributor.reputation} pts</span>
                              <span className="text-slate-500">•</span>
                              <span className="text-slate-400">{contributor.posts} posts</span>
                            </div>
                          </div>
                          <Award className="w-4 h-4 text-yellow-400" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Main Content */}
              <div className={`${activeTab === "chat" ? "lg:col-span-4" : "lg:col-span-3"} space-y-6`}>
                {/* Search and Actions */}
                {activeTab !== "chat" && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search discussions, strategies, or ask a question..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                      />
                    </div>
                    <button className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all flex items-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>New Discussion</span>
                    </button>
                  </div>
                )}

                {/* Tabs */}
                <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-xl">
                  {["discussions", "strategies", "help", "chat"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                        activeTab === tab
                          ? "bg-teal-500 text-white"
                          : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      {tab === "chat" ? (
                        <div className="flex items-center justify-center space-x-2">
                          <MessageCircle className="w-4 h-4" />
                          <span>Live Chat</span>
                        </div>
                      ) : (
                        tab.charAt(0).toUpperCase() + tab.slice(1)
                      )}
                    </button>
                  ))}
                </div>

                {activeTab === "chat" ? (
                  renderChatContent()
                ) : (
                  <>
                    {/* Discussions List */}
                    <div className="space-y-4">
                      {topDiscussions.map((discussion) => (
                        <div
                          key={discussion.id}
                          className="glass p-6 rounded-xl hover:border-teal-400/30 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                {discussion.isHot && (
                                  <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-medium">
                                    🔥 Hot
                                  </span>
                                )}
                                <span className="bg-slate-700 text-slate-300 px-2 py-1 rounded-full text-xs">
                                  {discussion.category}
                                </span>
                              </div>
                              <h3 className="text-lg font-semibold text-white mb-2 hover:text-teal-400 cursor-pointer">
                                {discussion.title}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-slate-400">
                                <span>by {discussion.author}</span>
                                <span>•</span>
                                <span className="flex items-center space-x-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{discussion.timeAgo}</span>
                                </span>
                              </div>
                            </div>
                            <Bookmark className="w-5 h-5 text-slate-400 hover:text-teal-400 cursor-pointer" />
                          </div>

                          <div className="flex items-center space-x-2 mb-4">
                            {discussion.tags.map((tag) => (
                              <span key={tag} className="flex items-center space-x-1 text-xs text-teal-400">
                                <Hash className="w-3 h-3" />
                                <span>{tag}</span>
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6 text-sm text-slate-400">
                              <span className="flex items-center space-x-1">
                                <Reply className="w-4 h-4" />
                                <span>{discussion.replies} replies</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{discussion.views} views</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{discussion.likes} likes</span>
                              </span>
                            </div>
                            <button className="text-teal-400 hover:text-teal-300 text-sm font-medium">
                              Join Discussion →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="glass p-6 rounded-xl text-center">
                        <MessageCircle className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                        <h3 className="text-white font-semibold mb-2">Ask a Question</h3>
                        <p className="text-slate-400 text-sm mb-4">Get help from experienced traders</p>
                        <button className="text-teal-400 hover:text-teal-300 text-sm font-medium">
                          Start Discussion →
                        </button>
                      </div>

                      <div className="glass p-6 rounded-xl text-center">
                        <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                        <h3 className="text-white font-semibold mb-2">Share Strategy</h3>
                        <p className="text-slate-400 text-sm mb-4">Help others with your trading insights</p>
                        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">Share Now →</button>
                      </div>

                      <div className="glass p-6 rounded-xl text-center">
                        <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                        <h3 className="text-white font-semibold mb-2">Join Groups</h3>
                        <p className="text-slate-400 text-sm mb-4">Connect with like-minded traders</p>
                        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                          Explore Groups →
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
