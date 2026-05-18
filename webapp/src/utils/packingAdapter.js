/**
 * Maps tripDetails packing items (packed: Yes/No) to Packing page UI schema.
 */
export function toPackingPageItems(packingList = []) {
  return packingList.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    quantity: item.quantity ?? 1,
    requiredStatus: item.required === "Yes" ? "Required" : "Optional",
    packedStatus: item.packed === "Yes" ? "Packed" : "Not Packed",
  }));
}

/**
 * Maps Packing page items back to tripDetails storage schema.
 */
export function fromPackingPageItems(items = []) {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    quantity: item.quantity ?? 1,
    required: item.requiredStatus === "Required" ? "Yes" : "No",
    packed: item.packedStatus === "Packed" ? "Yes" : "No",
  }));
}
