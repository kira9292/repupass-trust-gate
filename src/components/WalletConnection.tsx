
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface WalletConnectionProps {
  onWalletConnected: (address: string) => void;
  isLoading?: boolean;
}

const WalletConnection = ({ onWalletConnected, isLoading }: WalletConnectionProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error("MetaMask not detected. Please install MetaMask to continue.");
      return;
    }

    setIsConnecting(true);
    
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        const address = accounts[0];
        console.log("Wallet connected:", address);
        toast.success("Wallet connected successfully!");
        onWalletConnected(address);
      } else {
        toast.error("No accounts found. Please connect your wallet.");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      if (error.code === 4001) {
        toast.error("Connection rejected by user");
      } else {
        toast.error("Failed to connect wallet");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Mock wallet connection for demo purposes (when MetaMask is not available)
  const connectMockWallet = () => {
    const mockAddress = "0x" + Math.random().toString(16).substring(2, 42);
    console.log("Mock wallet connected:", mockAddress);
    toast.success("Demo wallet connected!");
    onWalletConnected(mockAddress);
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={connectWallet}
        disabled={isConnecting || isLoading}
        className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
      >
        {isConnecting ? (
          <>
            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <Wallet className="w-5 h-5 mr-3" />
            Connect with MetaMask
          </>
        )}
      </Button>
      
      <div className="text-center">
        <p className="text-sm text-gray-400 mb-2">Don't have MetaMask?</p>
        <Button
          variant="outline"
          onClick={connectMockWallet}
          disabled={isLoading}
          className="glass-effect border-gray-600 hover:bg-gray-800/50"
        >
          Try Demo Wallet
        </Button>
      </div>
    </div>
  );
};

export default WalletConnection;
