export function selectFeatured(products, count = 4) {
  if (!products) return [];
  return products.filter((p) => p.featured).slice(0, count);
}

export function selectPopular(products, excludeIds = [], count = 4) {
  if (!products) return [];
  const excludeSet = new Set(excludeIds);
  return products
    .filter((p) => p.popular && !excludeSet.has(p.id))
    .slice(0, count);
}

export function selectRelated(product, products, count = 4) {
  if (!product || !products) return [];
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}

export function selectByIds(ids, products) {
  if (!ids || !products) return [];
  const productMap = new Map(products.map((p) => [p.id, p]));
  const result = [];
  for (const id of ids) {
    const product = productMap.get(id);
    if (product) {
      result.push(product);
    }
  }
  return result;
}