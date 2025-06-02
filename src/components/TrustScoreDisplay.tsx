
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, ShieldCheck, ShieldX, Loader2 } from "lucide-react";

interface TrustScoreDisplayProps {
  score: number | null;
  isLoading: boolean;
  threshold: number;
}

const TrustScoreDisplay = ({ score, isLoading, threshold }: TrustScoreDisplayProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= threshold) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreIcon = (score: number) => {
    if (score >= threshold) return ShieldCheck;
    return ShieldX;
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "bg-green-500" };
    if (score >= threshold) return { label: "Good", color: "bg-yellow-500" };
    return { label: "Insufficient", color: "bg-red-500" };
  };

  if (isLoading) {
    return (
      <Card className="glass-effect border-0">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-lg text-white flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" />
            Verifying Trust Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex items-center justify-center gap-3 py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            <span className="text-gray-300">Fetching data from Graphite...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (score === null) return null;

  const ScoreIcon = getScoreIcon(score);
  const status = getScoreStatus(score);

  return (
    <Card className="glass-effect border-0">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-lg text-white flex items-center justify-center gap-2">
          <Shield className="w-5 h-5" />
          Trust Score Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ScoreIcon className={`w-8 h-8 ${getScoreColor(score)}`} />
            <span className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}
            </span>
            <span className="text-gray-400 text-lg">/100</span>
          </div>
          
          <Badge 
            className={`${status.color} text-white px-4 py-1`}
          >
            {status.label}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress to threshold</span>
            <span className="text-gray-300">{Math.min(score, threshold)}/{threshold}</span>
          </div>
          <Progress 
            value={Math.min((score / threshold) * 100, 100)} 
            className="h-3"
          />
        </div>

        <div className="text-center text-sm">
          {score >= threshold ? (
            <p className="text-green-400 flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Access granted! Redirecting to chat...
            </p>
          ) : (
            <p className="text-red-400 flex items-center justify-center gap-2">
              <ShieldX className="w-4 h-4" />
              Minimum score of {threshold} required for access
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustScoreDisplay;
