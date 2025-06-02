
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Shield, LogOut, Users, Clock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  trustScore: number;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers] = useState(12); // Mock online users count
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Mock messages for demo
  useEffect(() => {
    const mockMessages: Message[] = [
      {
        id: "1",
        user: "CryptoExpert",
        content: "Welcome to the trusted Web3 community! Only verified users can access this chat.",
        timestamp: new Date(Date.now() - 300000),
        trustScore: 92
      },
      {
        id: "2",
        user: "BlockchainDev",
        content: "Great to see more people joining with verified reputation scores!",
        timestamp: new Date(Date.now() - 180000),
        trustScore: 87
      },
      {
        id: "3",
        user: "DeFiTrader",
        content: "This reputation-based access is exactly what Web3 needed. No more spam or bots!",
        timestamp: new Date(Date.now() - 120000),
        trustScore: 94
      }
    ];
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: "You",
      content: newMessage,
      timestamp: new Date(),
      trustScore: 78 // Mock user's trust score
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
    toast.success("Message sent!");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getTrustBadgeColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-blue-500";
    if (score >= 75) return "bg-yellow-500";
    return "bg-gray-500";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <Card className="glass-effect border-0 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-green-500/20">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-xl gradient-text">
                    RepuPass Private Chat
                  </CardTitle>
                  <p className="text-sm text-gray-400">
                    Verified users only • Trust Score 75+ required
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="glass-effect">
                  <Users className="w-4 h-4 mr-2" />
                  {onlineUsers} online
                </Badge>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="glass-effect border-gray-600 hover:bg-gray-800/50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Chat Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Messages Area */}
          <div className="lg:col-span-3">
            <Card className="glass-effect border-0 h-[600px] flex flex-col">
              <CardContent className="flex-1 p-6 overflow-hidden">
                <div className="h-full flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-xs">
                            {message.user.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white text-sm">
                              {message.user}
                            </span>
                            <Badge 
                              className={`${getTrustBadgeColor(message.trustScore)} text-white text-xs px-2 py-0`}
                            >
                              {message.trustScore}
                            </Badge>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm bg-slate-800/50 rounded-lg p-3">
                            {message.content}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 glass-effect border-gray-600 bg-slate-800/50"
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat Info */}
            <Card className="glass-effect border-0">
              <CardHeader>
                <CardTitle className="text-lg text-white">Chat Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{onlineUsers}</div>
                  <div className="text-sm text-gray-400">Verified Users Online</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">75+</div>
                  <div className="text-sm text-gray-400">Minimum Trust Score</div>
                </div>
              </CardContent>
            </Card>

            {/* Your Status */}
            <Card className="glass-effect border-0">
              <CardHeader>
                <CardTitle className="text-lg text-white">Your Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">Verified & Online</span>
                </div>
                <div className="mt-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="text-sm text-gray-400">Trust Score</div>
                  <div className="text-lg font-bold text-yellow-400">78</div>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="glass-effect border-0">
              <CardHeader>
                <CardTitle className="text-lg text-white">Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Shield className="w-4 h-4 text-blue-400" />
                  Verified users only
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users className="w-4 h-4 text-blue-400" />
                  Real-time messaging
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  Anti-spam protection
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
