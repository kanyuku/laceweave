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

export const parseWalletError = (error: any): string => {
  const message = error?.message || error?.toString() || "Unknown error";
  
  if (message.includes("User declined")) return "Payment cancelled by user.";
  if (message.includes("Insufficient balance")) return "Insufficient ADA in wallet.";
  if (message.includes("Network error")) return "Blockchain network error. Please try again.";
  
  return message;
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
