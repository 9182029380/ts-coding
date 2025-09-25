/**
 * Demo: TypeScript features + FakeStoreAPI
 * Run with: node 18+ or ts-node (see package.json)
 */

const API = 'https://fakestoreapi.com/products';

/* ============================
   Generic typed fetch helper
   ============================ */
async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return (await res.json()) as T;
}

/* ============================
   Product type (based on fakestore shape)
   - We declare this so TypeScript can reason about fields.
   - The real API returns objects similar to this shape.
   ============================ */
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  rating?: { rate: number; count: number };
};

/* ============================
   Type-safe sort function (type-proof)
   - using generics and keyof
   - "typrof" interpreted as "type-proof"
   ============================ */
function sortByKey<T, K extends keyof T>(arr: T[], key: K, ascending = true): T[] {
  const copy = [...arr];
  copy.sort((a, b) => {
    // narrow to unknown then to number|string to make comparator generic
    const va = a[key] as unknown as number | string;
    const vb = b[key] as unknown as number | string;
    if (va === vb) return 0;
    // handle number or string comparators
    const comp = (va as any) > (vb as any) ? 1 : -1;
    return ascending ? comp : -comp;
  });
  return copy;
}

/* ============================
   Index access type: extract price type from Product
   and apply discount using that type
   ============================ */
type PriceType = Product['price']; // index access - number

function applyDiscount<T extends { price: PriceType }>(p: T, percent: number) {
  const discountedPrice = +(p.price * (1 - percent / 100)).toFixed(2);
  // We return a new object that keeps original fields + discountedPrice
  return { ...p, discountedPrice };
}

/* ============================
   typeof -> extract element type from array after fetch
   We will still use our Product type; but this pattern demonstrates usage.
   ============================ */
// After fetching `products`, we can do: type P = typeof products[number];

// Demonstrated later in runtime code

/* ============================
   Conditional Types -> validate stock:
   - Make a type that resolves to true if product has rating.count > 0
   - We can't inspect runtime numbers at type-level, but we can create a conditional type
     that checks if the shape contains `rating` with `count`.
   ============================ */
type HasStock<T> = T extends { rating: { count: number } } ? true : false;

// Example type checks:
type ExampleHasStock = HasStock<Product>; // true (because Product has rating?: {count:number})

// We can also create a runtime helper that uses the type information to guide safe code:
function isInStock(p: Product): boolean {
  return !!(p.rating && p.rating.count > 0);
}

/* ============================
   Mapped Types -> Partial update DTO
   - Partial<T> is a mapped type that makes all props optional
   - We'll show a DTO type for patch updates
   ============================ */
type UpdateProductDTO = Partial<Product>;

/* ============================
   Template Literal Types -> Analytics Events
   - Build event string types like `product:123:view` (string produced at runtime,
     but we can describe the pattern with template literal types)
   ============================ */
type ProductIdStr = `${number}`;
type AnalyticsEvent =
  | `product:${ProductIdStr}:view`
  | `product:${ProductIdStr}:add-to-cart`
  | `product:${ProductIdStr}:purchase`;

function trackEvent<E extends AnalyticsEvent>(event: E) {
  // type-safe event signature
  console.log('TRACK EVENT:', event);
}

/* ============================
   Main demo flow
   ============================ */
async function main() {
  // 1) Fetch products with generic helper
  const products = await fetchJson<Product[]>(API);
  console.log(`Fetched ${products.length} products.`);

  // 2) typeof extraction example (compile-time):
  type FirstProductType = typeof products[number]; // this infers Product type from fetched array
  // (TypeScript uses the declared Product type; this line demonstrates the pattern)

  // 3) Sort products by price (type-proof)
  const sortedAsc = sortByKey(products, 'price', true);
  console.log('Cheapest product:', sortedAsc[0].title, '-', sortedAsc[0].price);

  // 4) Apply discount to the 1st product (index access + returned discountedPrice)
  const discounted = applyDiscount(sortedAsc[0], 15); // 15% discount
  console.log('Applied discount:', discounted.title, 'original:', sortedAsc[0].price, 'discounted:', (discounted as any).discountedPrice);

  // 5) Conditional type check used at runtime via helper
  const some = products[0];
  console.log('Product has rating?', !!some.rating);
  console.log('In stock (runtime):', isInStock(some));

  // 6) Example Partial update DTO
  const partialUpdate: UpdateProductDTO = { id: some.id, price: some.price + 10, title: 'New title (patch demo)' };
  console.log('Partial DTO for patch:', partialUpdate);

  // 7) Template literal analytics events
  trackEvent(`product:${some.id}:view`);
  trackEvent(`product:${some.id}:add-to-cart`);

  // Safe type-check demonstration (the compiler prevents invalid event strings)
  // trackEvent('product:abc:view'); // <-- would be a compile-time error (if uncommented)
}

main().catch((err) => console.error(err));
