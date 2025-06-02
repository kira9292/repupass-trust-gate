
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Wallet, Users, CheckCircle, AlertCircle, Zap } from "lucide-react";
import { toast } from "sonner";
import WalletConnection from "@/components/WalletConnection";
import TrustScoreDisplay from "@/components/TrustScoreDisplay";

const Index = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [trustScore, setTrustScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleWalletConnected = async (address: string) => {
    setWalletAddress(address);
    setIsLoading(true);
    
    try {
      // Simulate API call to Graphite for Trust Score
      // In real implementation, this would call the actual Graphite API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock trust score (in real app, this would come from Graphite API)
      const mockScore = Math.floor(Math.random() * 100);
      setTrustScore(mockScore);
      
      console.log(`Trust Score retrieved for ${address}: ${mockScore}`);
      
      if (mockScore >= 75) {
        toast.success("Trust Score verified! Redirecting to chat...");
        setTimeout(() => navigate("/chat"), 1500);
      } else {
        toast.error("Insufficient Trust Score for access");
        setTimeout(() => navigate("/insufficient-trust"), 1500);
      }
    } catch (error) {
      console.error("Error fetching trust score:", error);
      toast.error("Failed to verify Trust Score");
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Reputation-Based Access",
      description: "Only users with verified on-chain reputation can access premium features"
    },
    {
      icon: Wallet,
      title: "Seamless Web3 Login",
      description: "Connect your wallet and get instant verification through Graphite"
    },
    {
      icon: Users,
      title: "Trusted Community",
      description: "Join a community of verified, trustworthy Web3 users"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full glass-effect pulse-glow">
              <Shield className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-6">
            <span className="gradient-text">RepuPass</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Universal Web3 login system based on on-chain reputation. 
            Access premium applications with your verified trust score from Graphite.
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="glass-effect">
              <Zap className="w-4 h-4 mr-2" />
              Powered by Graphite
            </Badge>
            <Badge variant="secondary" className="glass-effect">
              <CheckCircle className="w-4 h-4 mr-2" />
              Trust Score Required: 75+
            </Badge>
          </div>
        </div>

        {/* Connection Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="glass-effect border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl gradient-text">
                Connect & Verify
              </CardTitle>
              <CardDescription className="text-gray-300">
                Connect your wallet to verify your Trust Score and access the private chat
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <WalletConnection 
                onWalletConnected={handleWalletConnected}
                isLoading={isLoading}
              />
              
              {walletAddress && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <p className="text-sm text-gray-400 mb-1">Connected Wallet</p>
                    <p className="font-mono text-sm text-blue-400">{walletAddress}</p>
                  </div>
                  
                  <TrustScoreDisplay 
                    score={trustScore} 
                    isLoading={isLoading}
                    threshold={75}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="glass-effect border-0 float-animation" style={{animationDelay: `${index * 0.2}s`}}>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-blue-500/20">
                    <feature.icon className="w-8 h-8 text-blue-400" />
                  </div>
                </div>
                <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-center">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Demo Notice */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto glass-effect border-yellow-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Demo Mode</span>
              </div>
              <p className="text-gray-300 text-sm">
                This is a demo application. Trust Scores are randomly generated. 
                In production, scores would be fetched from the actual Graphite API.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
