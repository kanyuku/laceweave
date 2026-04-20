import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CreditCard, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import type { CardanoPaymentState } from "./types";

interface CardanoPaymentButtonProps {
  payment: CardanoPaymentState;
  label?: string;
  className?: string;
  showDetails?: boolean;
}

export const CardanoPaymentButton: React.FC<CardanoPaymentButtonProps> = ({
  payment,
  label = "Pay with Cardano",
  className = "",
  showDetails = true
}) => {
  const { 
    status, 
    isProcessing, 
    initiatePayment, 
    error, 
    txHash, 
    confirmations,
    network
  } = payment;

  const getExplorerUrl = (hash: string) => {
    const baseUrl = network === "mainnet" 
      ? "https://cardanoscan.io" 
      : `https://${network}.cardanoscan.io`;
    return `${baseUrl}/transaction/${hash}`;
  };

  const getStatusConfig = () => {
    switch (status) {
      case "preparing": return { label: "Preparing Tx...", icon: <Loader2 className="animate-spin" />, color: "bg-blue-500", aria: "Preparing transaction" };
      case "signing": return { label: "Check Wallet...", icon: <Loader2 className="animate-spin" />, color: "bg-indigo-600", aria: "Waiting for wallet signature" };
      case "submitting": return { label: "Submitting...", icon: <Loader2 className="animate-spin" />, color: "bg-violet-600", aria: "Submitting to blockchain" };
      case "submitted": return { label: "Tx Submitted", icon: <CheckCircle2 />, color: "bg-emerald-500", aria: "Transaction successfully submitted" };
      case "confirming": return { label: `Confirming (${confirmations})`, icon: <Loader2 className="animate-spin" />, color: "bg-teal-500", aria: `Confirming transaction` };
      case "confirmed": return { label: "Payment Confirmed", icon: <CheckCircle2 />, color: "bg-green-600", aria: "Payment confirmed on ledger" };
      case "error": return { label: "Try Again", icon: <AlertCircle />, color: "bg-rose-500", aria: "Transaction error" };
      default: return { label: label, icon: <CreditCard />, color: "bg-blue-600", aria: "Click to pay" };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`flex flex-col gap-4 w-full max-w-sm ${className}`} role="complementary">
      <motion.button
        whileHover={{ scale: isProcessing ? 1 : 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)" }}
        whileTap={{ scale: isProcessing ? 1 : 0.98 }}
        onClick={initiatePayment}
        disabled={isProcessing || status === "confirmed"}
        aria-label={config.aria}
        aria-busy={isProcessing}
        className={`
          relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl 
          text-white font-bold transition-all duration-300 shadow-xl
          ${config.color} 
          ${isProcessing ? "cursor-not-allowed opacity-90" : "hover:brightness-110"}
          ${status === "confirmed" ? "cursor-default" : ""}
          overflow-hidden
        `}
      >
        {/* Subtle Shine effect for idle state */}
        {status === "idle" && (
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="absolute top-0 w-24 h-full bg-white/20 skew-x-[-20deg] blur-sm"
          />
        )}

        <AnimatePresence mode="wait">
          <motion.span
            key={status}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex items-center gap-3 relative z-10"
          >
            {config.icon}
            <span className="tracking-tight">{config.label}</span>
          </motion.span>
        </AnimatePresence>
        
        {status === "idle" && (
          <ChevronRight className="absolute right-4 w-5 h-5 opacity-40" aria-hidden="true" />
        )}
      </motion.button>

      {showDetails && (
        <AnimatePresence>
          {(error || txHash) && (
            <motion.div
              initial={{ height: 0, opacity: 0, scale: 0.95 }}
              animate={{ height: "auto", opacity: 1, scale: 1 }}
              exit={{ height: 0, opacity: 0, scale: 0.95 }}
              className="overflow-hidden origin-top"
              aria-live="polite"
            >
              <div className={`
                p-5 rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl relative
                ${error ? "bg-red-500/10 text-red-100" : "bg-emerald-500/10 text-emerald-50"}
              `}>
                {/* Background glow */}
                <div className={`absolute -top-10 -left-10 w-32 h-32 blur-3xl opacity-20 rounded-full ${error ? "bg-red-500" : "bg-emerald-500"}`} />
                
                {error ? (
                  <div className="flex gap-3 items-start relative z-10">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-300" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-xs font-bold uppercase tracking-widest opacity-60">Payment Failed</h4>
                      <p className="text-sm leading-relaxed">{error.message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Transaction Hash</h4>
                        <code className="text-[11px] font-mono break-all bg-black/20 p-3 rounded-xl border border-white/5 block select-all">
                          {txHash}
                        </code>
                      </div>
                      <a 
                        href={getExplorerUrl(txHash || "")} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold transition-colors border border-white/5"
                      >
                        Explorer <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {status === "confirming" && (
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] uppercase font-bold tracking-widest opacity-50">On-Ledger Status</span>
                          <span className="text-[10px] font-mono bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30">
                            {confirmations} confirmations
                          </span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/10">
                          <motion.div 
                            className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                          />
                        </div>
                        <p className="text-[10px] opacity-40 italic text-center">Waiting for ledger settlement (approx. 20s per block)</p>
                      </div>
                    )}

                    {status === "confirmed" && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 text-xs font-bold bg-emerald-500/20 p-2 rounded-lg border border-emerald-500/30 justify-center"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Finalized Successfully
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
