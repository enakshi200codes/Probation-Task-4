import { MAX_CART_QUANTITY } from "../config/constants";
import { calculateLineTotal } from "./pricing";

export function clampQuantity(value) {
  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || parsed < 1) return 1;
  if (parsed > MAX_CART_QUANTITY) return MAX_CART_QUANTITY;
  return parsed;
}

export function buildCartLines(items, products) {
  if (!items || !Array.isArray(items) || !products || !Array.isArray(products)) {
    return [];
  }

  const productMap = new Map(products.map((p) => [p.id, p]));
  const lines = [];

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) continue;

    const quantity = clampQuantity(item.quantity);
    const unitPrice = product.price;
    const originalUnitPrice = product.originalPrice ?? null;
    const lineTotal = calculateLineTotal(unitPrice, quantity);

    lines.push({
      productId: product.id,
      name: product.name,
      image: product.images[0] || "",
      unitPrice,
      originalUnitPrice,
      quantity,
      lineTotal
    });
  }

  return lines;
}