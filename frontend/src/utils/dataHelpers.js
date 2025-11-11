// Safe data access utilities
export const getSafeRating = (rating) => {
  if (!rating) return 0;
  if (typeof rating === 'object' && rating !== null) {
    return rating.average || 0;
  }
  return Number(rating) || 0;
};

export const getSafeReviewCount = (reviewCount) => {
  if (!reviewCount) return 0;
  if (typeof reviewCount === 'object' && reviewCount !== null) {
    return reviewCount.count || 0;
  }
  return Number(reviewCount) || 0;
};

export const getSafeString = (value, fallback = '') => {
  if (!value) return fallback;
  return String(value);
};