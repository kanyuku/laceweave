import type { PaymentMetadata } from "./types";

export const formatCIP20Metadata = (metadata: PaymentMetadata) => {
  const messages: string[] = [];
  
  if (metadata.orderId) messages.push(`OrderID: ${metadata.orderId}`);
  if (metadata.description) messages.push(metadata.description);
  if (metadata.externalRef) messages.push(`Ref: ${metadata.externalRef}`);
  
  Object.keys(metadata).forEach(key => {
    if (!["orderId", "description", "externalRef"].includes(key)) {
      messages.push(`${key}: ${metadata[key]}`);
    }
  });

  return {
    "674": {
      "msg": messages.slice(0, 4)
    }
  };
};

export const formatAda = (lovelace: bigint | string): string => {
  const val = typeof lovelace === "string" ? BigInt(lovelace) : lovelace;
  return (Number(val) / 1_000_000).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
};

export const parseWalletError = (error: unknown): string => {
  if (!error) return "Unknown error occurred.";

  const message = error instanceof Error 
    ? error.message 
    : typeof error === "string" 
      ? error 
      : (error as Record<string, unknown>)?.message?.toString() || JSON.stringify(error);
  
  if (message.includes("User declined") || message.includes("Declined")) {
    return "Payment cancelled by user.";
  }
  if (message.includes("Insufficient balance") || message.includes("InsufficientFunds")) {
    return "Insufficient ADA in wallet to complete this transaction.";
  }
  if (message.includes("Network error") || message.includes("connection")) {
    return "Blockchain network error. Please check your connection and try again.";
  }
  if (message.includes("Inputs unavailable")) {
    return "UTxO clash: Another transaction is pending. Please wait a moment.";
  }
  
  return message.length > 100 ? `${message.substring(0, 97)}...` : message;
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
