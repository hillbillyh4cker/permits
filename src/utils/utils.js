import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge tailwind classes safely.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Utility to download a file from base64 data.
 */
export function downloadFile(base64Data, fileName) {
  const link = document.createElement('a');
  link.href = base64Data;
  link.download = fileName || 'download';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
