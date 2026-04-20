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
    confirmations 
  } = payment;

  const getStatusConfig = () => {
    switch (status) {
      case "preparing": return { label: "Preparing Tx...", icon: <Loader2 className="animate-spin" />, color: "bg-blue-500", aria: "Preparing transaction" };
      case "signing": return { label: "Check Wallet...", icon: <Loader2 className="animate-spin" />, color: "bg-indigo-500", aria: "Waiting for wallet signature" };
      case "submitting": return { label: "Submitting...", icon: <Loader2 className="animate-spin" />, color: "bg-purple-500", aria: "Submitting to blockchain" };
      case "submitted": return { label: "Tx Submitted", icon: <CheckCircle2 />, color: "bg-emerald-500", aria: "Transaction successfully submitted" };
      case "confirming": return { label: `Confirming (${confirmations})`, icon: <Loader2 className="animate-spin" />, color: "bg-teal-500", aria: `Confirming transaction` };
      case "confirmed": return { label: "Payment Confirmed", icon: <CheckCircle2 />, color: "bg-green-600", aria: "Payment confirmed on ledger" };
      case "error": return { label: "Try Again", icon: <AlertCircle />, color: "bg-rose-500", aria: "Transaction error" };
      default: return { label: label, icon: <CreditCard />, color: "bg-blue-600", aria: "Click to pay" };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`flex flex-col gap-3 w-full max-w-sm ${className}`} role="complementary">
      <motion.button
        whileHover={{ scale: isProcessing ? 1 : 1.02 }}
        whileTap={{ scale: isProcessing ? 1 : 0.98 }}
        onClick={initiatePayment}
        disabled={isProcessing || status === "confirmed"}
        aria-label={config.aria}
        aria-busy={isProcessing}
        className={`
          relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl 
          text-white font-semibold transition-all duration-300 shadow-lg
          ${config.color} 
          ${isProcessing ? "cursor-not-allowed opacity-90" : "hover:shadow-xl"}
          ${status === "confirmed" ? "cursor-default" : ""}
        `}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            {config.icon}
            {config.label}
          </motion.span>
        </AnimatePresence>
        
        {status === "idle" && (
          <ChevronRight className="absolute right-4 w-5 h-5 opacity-50" aria-hidden="true" />
        )}
      </motion.button>

      {showDetails && (
        <AnimatePresence>
          {(error || txHash) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
              aria-live="polite"
            >
              <div className={`
                p-4 rounded-xl border backdrop-blur-md
                ${error ? "bg-rose-50/50 border-rose-200 text-rose-700" : "bg-emerald-50/50 border-emerald-200 text-emerald-700"}
              `}>
                {error ? (
                  <div className="flex gap-2 items-start">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p className="text-sm">{error.message}</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs uppercase tracking-wider font-bold opacity-60">
                      <span>Transaction ID</span>
                      <a 
                        href={`https://preprod.cardanoscan.io/transaction/${txHash}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-1 hover:underline text-blue-600"
                      >
                        Scanner <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <code className="text-[10px] break-all bg-white/50 p-2 rounded border border-emerald-200 block select-all">
                      {txHash}
                    </code>
                    {status === "confirming" && (
                      <div className="mt-2 flex flex-col gap-1">
                        <div className="flex justify-between text-[10px] font-bold opacity-70">
                          <span>Confirming on Ledger</span>
                          <span>{confirmations} confirmations</span>
                        </div>
                        <div className="w-full bg-emerald-200/30 h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            className="bg-emerald-500 h-full"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 15, repeat: Infinity }}
                          />
                        </div>
                      </div>
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
