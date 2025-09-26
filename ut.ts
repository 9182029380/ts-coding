// =============== 1. Define types based on Fake Store API ===============
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number; // We'll treat `count` as inventory level
  };
};

// =============== 2. Async helper functions ===============
// Fetch product by ID
async function fetchProduct(id: number): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    return null;
  }
}

// Check if product is in stock (using rating.count as proxy for inventory)
 function checkInventory(product: Product): Promise<boolean> {
  return Promise.resolve(product.rating.count > 0); // If count > 0, assume in stock
}

// Apply discount (e.g., 15% off)
async function applyDiscount(product: Product, discountPercent: number = 15): Promise<number> {
  return Number((product.price * (1 - discountPercent / 100)).toFixed(2));
}

// =============== 3. Use Awaited to extract resolved types ===============
type FetchedProduct = Awaited<ReturnType<typeof fetchProduct>>;     // Product | null
type IsInStock      = Awaited<ReturnType<typeof checkInventory>>;   // boolean
type FinalPrice     = Awaited<ReturnType<typeof applyDiscount>>;    // number

// =============== 4. Main e-commerce workflow ===============
async function processProductForCheckout(productId: number): Promise<void> {
  // Step 1: Fetch product
  const product: FetchedProduct = await fetchProduct(productId);
  if (!product) {
    console.log(`❌ Product #${productId} not found.`);
    return;
  }

  // Step 2: Check inventory
  const isInStock: IsInStock = await checkInventory(product);
  if (!isInStock) {
    console.log(`⚠️  "${product.title}" is out of stock!`);
    return;
  }

  // Step 3: Apply discount
  const finalPrice: FinalPrice = await applyDiscount(product, 20); // 20% off

  // Step 4: Safe to use — all types are unwrapped and known
  console.log(`✅ Ready for checkout!`);
  console.log(`📦 Product: ${product.title}`);
  console.log(`💰 Original: $${product.price}`);
  console.log(`🏷️  Discounted: $${finalPrice}`);
  console.log(`📊 Rating: ${product.rating.rate} ⭐ (${product.rating.count} reviews)`);
}

// =============== 5. Run the example ===============
// Try with product ID 1 (Backpack)
processProductForCheckout(1);