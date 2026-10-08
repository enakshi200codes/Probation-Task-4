import { SHIPPING_FLAT_FEE, FREE_SHIPPING_THRESHOLD } from "../config/constants";

export function roundMoney(amount) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function getDiscountPercent(product) {
  if (!product || !product.originalPrice || product.originalPrice <= product.price) {
    return 0;
  }
  return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
}

export function calculateLineTotal(unitPrice, quantity) {
  return roundMoney(unitPrice * quantity);
}

export function calculateShipping(subtotal) {
  if (subtotal <= 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }
  return SHIPPING_FLAT_FEE;
}

export function calculateTotals(lines) {
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = roundMoney(lines.reduce((sum, line) => sum + line.lineTotal, 0));
  const savings = roundMoney(
    lines.reduce((sum, line) => {
      if (line.originalUnitPrice && line.originalUnitPrice > line.unitPrice) {
        return sum + (line.originalUnitPrice - line.unitPrice) * line.quantity;
      }
      return sum;
    }, 0)
  );
  const shipping = calculateShipping(subtotal);
  const total = roundMoney(subtotal + shipping);

  return {
    itemCount,
    subtotal,
    savings,
    shipping,
    total
  };
}