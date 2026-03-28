/**
 * Calculate the status of a permit based on its submission and expiration dates.
 */
export const calculateStatus = (submissionDate, expirationDate) => {
  const now = new Date();
  const subDate = new Date(submissionDate);
  const expDate = new Date(expirationDate);
  
  // Normalize dates to midnight for comparison
  now.setHours(0, 0, 0, 0);
  subDate.setHours(0, 0, 0, 0);
  expDate.setHours(0, 0, 0, 0);

  if (expDate < now) return 'Expired';
  
  // 30 days before expiration
  const thirtyDaysFromNow = new Date(now);
  thirtyDaysFromNow.setDate(now.getDate() + 30);
  
  if (expDate <= thirtyDaysFromNow) return 'Expiring Soon';
  
  if (subDate > now) return 'Pending Submission';
  
  return 'Active';
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};
/**
 * Check if a date is within a specific threshold (e.g. 48 hours)
 */
export const isWithinUrgentThreshold = (dateString, hours = 48) => {
  if (!dateString) return false;
  const now = new Date();
  const targetDate = new Date(dateString);
  const diffInMs = targetDate - now;
  const diffInHours = diffInMs / (1000 * 60 * 60);
  
  // Return true if the date is in the past OR within the next X hours
  return diffInHours <= hours;
};
