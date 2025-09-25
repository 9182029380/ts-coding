// generics.ts
// Demonstrates Generics and utility types (Partial, Pick, Omit, Record) in a commerce context

// Generic CartItem
export interface CartItem<T> {
  product: T;
  quantity: number;
}

// Utility types
export type ProductPreview = Pick<{ id: string; name: string; price: number; }, 'id' | 'name'>;
export type ProductUpdate = Partial<{ id: string; name: string; price: number; stock: number; }>;
export type ProductWithoutStock = Omit<{ id: string; name: string; price: number; stock: number; }, 'stock'>;
export type ProductRecord = Record<string, { id: string; name: string; }>;

// Example usage
const preview: ProductPreview = { id: 'p1', name: 'Shirt' };
const update: ProductUpdate = { price: 19.99 };
