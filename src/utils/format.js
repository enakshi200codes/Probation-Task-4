import { LOCALE, CURRENCY_CODE } from "../config/constants";

export function formatPrice(amount) {
  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY_CODE,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(LOCALE, {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

export function formatRatingText(value, count) {
  return `Rated ${value} out of 5 from ${count} reviews`;
}