export function isValidCartItems(items) {
  if (!Array.isArray(items)) return false;
  return items.every(
    (item) =>
      item &&
      typeof item.productId === "string" &&
      typeof item.quantity === "number" &&
      Number.isInteger(item.quantity) &&
      item.quantity >= 1 &&
      item.quantity <= 10
  );
}