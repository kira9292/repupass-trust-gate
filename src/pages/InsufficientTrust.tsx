
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldX, ArrowLeft, CheckCircle, ExternalLink, Info } from "lucide-react";

const InsufficientTrust = () => {
  const navigate = useNavigate();

  const improvementSteps = [
    {
      title: "Complete KYC Verification",
      description: "Verify your identity through Graphite's KYC process",
      points: "+25 points",
      urgent: true
    },
    {
      title: "Link Social Accounts",
      description: "Connect your Twitter, GitHub, and LinkedIn profiles",
      points: "+15 points",
      urgent: false
    },
    {
      title: "Participate in Community",
      description: "Engage in verified Web3 communities and DAOs",
      points: "+10 points",
      urgent: false
    },
    {
      title: "Complete Transactions",
      description: "Build a history of legitimate on-chain transactions",
      points: "+20 points",
      urgent: false
    },
    {
      title: "Get Endorsements",
      description: "Receive endorsements from other verified users",
      points: "+15 points",
      urgent: false
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full glass-effect border border-red-500/30">
                <ShieldX className="w-12 h-12 text-red-400" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-4 text-white">
              Access Denied
            </h1>
            
            <p className="text-xl text-gray-300 mb-6">
              Your current Trust Score doesn't meet the minimum requirement for this application.
            </p>

            <div className="flex justify-center gap-4 flex-wrap">
              <Badge variant="destructive" className="glass-effect">
                <ShieldX className="w-4 h-4 mr-2" />
                Trust Score Below 75
              </Badge>
              <Badge variant="secondary" className="glass-effect">
                Required: 75+ points
              </Badge>
            </div>
          </div>

          {/* Info Card */}
          <Card className="glass-effect border-0 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-400" />
                Why Trust Scores Matter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                RepuPass uses Trust Scores from Graphite to ensure only verified, legitimate users can access premium features. 
                This helps create a safer environment by preventing spam, bots, and malicious actors from participating.
              </p>
            </CardContent>
          </Card>

          {/* Improvement Steps */}
          <Card className="glass-effect border-0 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-white">
                How to Improve Your Trust Score
              </CardTitle>
              <p className="text-gray-300">
                Follow these steps to increase your reputation and gain access:
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {improvementSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`p-4 rounded-lg border ${
                      step.urgent 
                        ? 'bg-red-500/10 border-red-500/30' 
                        : 'bg-slate-800/50 border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <h3 className="font-semibold text-white">{step.title}</h3>
                          {step.urgent && (
                            <Badge variant="destructive" className="text-xs">
                              Priority
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm">{step.description}</p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="bg-green-500/20 text-green-400 border-green-500/30"
                      >
                        {step.points}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="glass-effect border-gray-600 hover:bg-gray-800/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <Button
              onClick={() => window.open("https://graphite.dev", "_blank")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Improve on Graphite
            </Button>
          </div>

          {/* Demo Notice */}
          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto glass-effect border-yellow-500/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Info className="w-5 h-5 text-yellow-400" />
                  <span className="text-yellow-400 font-semibold">Demo Mode</span>
                </div>
                <p className="text-gray-300 text-sm">
                  This is a demonstration. In a real application, you would complete these steps 
                  on the actual Graphite platform to improve your Trust Score.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsufficientTrust;
