// TypeScript Utility Types in E-commerce Application
// Complete examples with definitions, usage, and analogies

// =============================================================================
// 1. Awaited<Type>
// =============================================================================
// Definition: Extracts the type that a Promise resolves to
// Usage: Working with async operations
// Analogy: Like unwrapping a gift box to see what's inside

interface Product {
  id: string;
  name: string;
  price: number;
}

async function fetchProduct(id: string): Promise<Product> {
  // Simulate API call
  return { id, name: "iPhone 15", price: 999 };
}

// Extract the actual product type from the Promise
type ProductType = Awaited<ReturnType<typeof fetchProduct>>; // Product
// Same as: type ProductType = Product;

const handleProduct = (product: ProductType) => {
  console.log(`Product: ${product.name}, Price: $${product.price}`);
};

// =============================================================================
// 2. Partial<Type>
// =============================================================================
// Definition: Makes all properties of a type optional
// Usage: For updates where you don't need all fields
// Analogy: Like a form where not all fields are required to fill

interface User {
  id: string;
  email: string;
  name: string;
  address: string;
}

// Update user - only some fields might be provided
function updateUser(userId: string, updates: Partial<User>): User {
  const existingUser: User = { id: userId, email: "old@email.com", name: "Old Name", address: "Old Address" };
  return { ...existingUser, ...updates };
}

const updatedUser = updateUser("123", { name: "John Doe" }); // Only name is updated

// =============================================================================
// 3. Required<Type>
// =============================================================================
// Definition: Makes all properties of a type required
// Usage: Ensuring all fields are present
// Analogy: Like a mandatory form where every field must be filled

interface ProductDraft {
  name?: string;
  price?: number;
  description?: string;
  category?: string;
}

// When saving to database, all fields must be present
type ProductForDatabase = Required<ProductDraft>;

function saveProduct(product: ProductForDatabase) {
  // All fields are guaranteed to exist
  console.log(`Saving: ${product.name} at $${product.price}`);
}

// =============================================================================
// 4. Readonly<Type>
// =============================================================================
// Definition: Makes all properties read-only
// Usage: Preventing modifications to objects
// Analogy: Like a museum exhibit - you can look but not touch

interface Order {
  id: string;
  userId: string;
  items: string[];
  total: number;
}

type ImmutableOrder = Readonly<Order>;

function processOrder(order: ImmutableOrder) {
  // order.total = 500; // Error! Cannot assign to read-only property
  console.log(`Processing order ${order.id} for $${order.total}`);
}

// =============================================================================
// 5. Record<Keys, Type>
// =============================================================================
// Definition: Creates an object type with specific keys and value types
// Usage: Creating dictionaries or maps
// Analogy: Like a filing cabinet where each drawer has the same type of content

type ProductCategory = 'electronics' | 'clothing' | 'books' | 'home';

// Map each category to its product count
type CategoryStats = Record<ProductCategory, number>;

const categoryInventory: CategoryStats = {
  electronics: 150,
  clothing: 300,
  books: 75,
  home: 200
};

// Map product IDs to their details
type ProductCatalog = Record<string, Product>;

const catalog: ProductCatalog = {
  "prod1": { id: "prod1", name: "Laptop", price: 999 },
  "prod2": { id: "prod2", name: "T-Shirt", price: 29 }
};

// =============================================================================
// 6. Pick<Type, Keys>
// =============================================================================
// Definition: Creates a type by picking specific properties from another type
// Usage: Creating focused interfaces from larger ones
// Analogy: Like selecting specific items from a buffet

interface FullProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// For product list view, we only need basic info
type ProductListItem = Pick<FullProduct, 'id' | 'name' | 'price' | 'inStock'>;

function displayProductList(products: ProductListItem[]) {
  products.forEach(product => {
    console.log(`${product.name}: $${product.price} ${product.inStock ? '✓' : '✗'}`);
  });
}

// =============================================================================
// 7. Omit<Type, Keys>
// =============================================================================
// Definition: Creates a type by removing specific properties from another type
// Usage: Excluding sensitive or irrelevant data
// Analogy: Like a redacted document with certain parts blacked out

interface UserAccount {
  id: string;
  email: string;
  password: string;
  name: string;
  creditCard: string;
  address: string;
}

// Public profile excludes sensitive information
type PublicProfile = Omit<UserAccount, 'password' | 'creditCard'>;

function getPublicProfile(user: UserAccount): PublicProfile {
  const { password, creditCard, ...publicInfo } = user;
  return publicInfo;
}

// =============================================================================
// 8. Exclude<UnionType, ExcludedMembers>
// =============================================================================
// Definition: Removes types from a union type
// Usage: Filtering out unwanted options
// Analogy: Like removing items you don't want from a menu

type PaymentMethod = 'credit_card' | 'debit_card' | 'paypal' | 'bitcoin' | 'cash';

// Remove cash and bitcoin for online payments
type OnlinePaymentMethod = Exclude<PaymentMethod, 'cash' | 'bitcoin'>;
// Result: 'credit_card' | 'debit_card' | 'paypal'

function processOnlinePayment(method: OnlinePaymentMethod) {
  // method can never be 'cash' or 'bitcoin' here
  console.log(`Processing online payment via ${method}`);
}

// =============================================================================
// 9. Extract<Type, Union>
// =============================================================================
// Definition: Extracts types from a union that are assignable to another union
// Usage: Filtering to keep only wanted types
// Analogy: Like using a sieve to keep only specific sizes

type AllNotifications = 'order_confirmed' | 'payment_failed' | 'item_shipped' | 'user_login' | 'price_alert';

// Extract only order-related notifications
type OrderNotifications = Extract<AllNotifications, `${string}order${string}` | `${string}shipped${string}`>;
// Result: 'order_confirmed' | 'item_shipped'

function handleOrderNotification(type: OrderNotifications) {
  console.log(`Handling order notification: ${type}`);
}

// =============================================================================
// 10. NonNullable<Type>
// =============================================================================
// Definition: Removes null and undefined from a type
// Usage: Ensuring values are not null/undefined
// Analogy: Like filtering out empty containers

type ProductSearch = Product | null | undefined;

function displayProduct(product: NonNullable<ProductSearch>) {
  // product is guaranteed to be Product, not null or undefined
  console.log(`Displaying: ${product.name} - $${product.price}`);
}

// =============================================================================
// 11. Parameters<Type>
// =============================================================================
// Definition: Extracts parameter types from a function type
// Usage: Getting function parameter types for reuse
// Analogy: Like getting a list of ingredients from a recipe

function createOrder(userId: string, items: Product[], couponCode?: string) {
  return { userId, items, couponCode };
}

// Extract parameter types
type CreateOrderParams = Parameters<typeof createOrder>;
// Result: [string, Product[], string?]

// Use the same parameters for validation
function validateOrderParams(...params: CreateOrderParams): boolean {
  const [userId, items, couponCode] = params;
  return userId.length > 0 && items.length > 0;
}

// =============================================================================
// 12. ConstructorParameters<Type>
// =============================================================================
// Definition: Extracts constructor parameter types from a class
// Usage: Getting constructor parameters for factory functions
// Analogy: Like getting the blueprint requirements for building something

class ShoppingCart {
  constructor(
    public userId: string,
    public currency: string = 'USD',
    public maxItems: number = 50
  ) {}
}

// Extract constructor parameter types
type CartConstructorParams = ConstructorParameters<typeof ShoppingCart>;
// Result: [string, string?, number?]

function createCartFactory(...params: CartConstructorParams): ShoppingCart {
  return new ShoppingCart(...params);
}

// =============================================================================
// 13. ReturnType<Type>
// =============================================================================
// Definition: Extracts the return type of a function
// Usage: Getting function return types
// Analogy: Like knowing what you'll get from a vending machine

function calculateOrderTotal(items: Product[], taxRate: number) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  return {
    subtotal,
    tax: subtotal * taxRate,
    total: subtotal * (1 + taxRate)
  };
}

// Extract return type
type OrderTotal = ReturnType<typeof calculateOrderTotal>;
// Result: { subtotal: number; tax: number; total: number; }

function displayOrderSummary(summary: OrderTotal) {
  console.log(`Subtotal: $${summary.subtotal}, Tax: $${summary.tax}, Total: $${summary.total}`);
}

// =============================================================================
// 14. InstanceType<Type>
// =============================================================================
// Definition: Extracts the instance type of a class constructor
// Usage: Getting class instance types
// Analogy: Like knowing what type of car you get from a car factory

class ProductReview {
  constructor(
    public productId: string,
    public userId: string,
    public rating: number,
    public comment: string
  ) {}

  display() {
    return `${this.rating}/5 stars: ${this.comment}`;
  }
}

// Extract instance type
type Review = InstanceType<typeof ProductReview>;

function saveReview(review: Review) {
  console.log(`Saving review: ${review.display()}`);
}

// =============================================================================
// 15. NoInfer<Type>
// =============================================================================
// Definition: Prevents TypeScript from inferring a type in generic contexts
// Usage: Controlling type inference in generic functions
// Analogy: Like telling someone "don't guess, I'll tell you exactly what it is"

function createProductVariant<T extends string>(
  baseProduct: Product,
  variantType: T,
  variantValue: NoInfer<T> // Prevents inference from this parameter
): Product & { variant: T } {
  return { ...baseProduct, variant: variantValue };
}

// TypeScript won't infer T from the second argument
const variant = createProductVariant(
  { id: "1", name: "Shirt", price: 25 },
  "size", // T is inferred as "size"
  "size" // This must match T exactly, no inference here
);

// =============================================================================
// 16. ThisParameterType<Type>
// =============================================================================
// Definition: Extracts the type of 'this' parameter from a function
// Usage: Working with functions that have explicit 'this' context
// Analogy: Like identifying who the speaker is in a conversation

interface CartContext {
  items: Product[];
  total: number;
}

function addToCart(this: CartContext, product: Product) {
  this.items.push(product);
  this.total += product.price;
}

// Extract the 'this' parameter type
type CartThis = ThisParameterType<typeof addToCart>; // CartContext

function setupCart(): CartThis {
  return { items: [], total: 0 };
}

// =============================================================================
// 17. OmitThisParameter<Type>
// =============================================================================
// Definition: Removes the 'this' parameter from a function type
// Usage: Creating function types without 'this' context
// Analogy: Like removing the speaker identification from a transcript

// Remove 'this' parameter to get a regular function type
type AddToCartFunction = OmitThisParameter<typeof addToCart>;
// Result: (product: Product) => void

const addProductToCart: AddToCartFunction = (product: Product) => {
  console.log(`Adding ${product.name} to cart`);
};

// =============================================================================
// 18. ThisType<Type>
// =============================================================================
// Definition: Provides type for 'this' context in object literals
// Usage: Type-safe object methods with shared context
// Analogy: Like setting the context for who "I" refers to in a story

interface CartActions {
  add(product: Product): void;
  remove(productId: string): void;
  clear(): void;
}

interface CartState {
  items: Product[];
  total: number;
}

// Methods will have 'this' typed as CartState
const cartMethods: CartActions & ThisType<CartState> = {
  add(product) {
    this.items.push(product); // 'this' is typed as CartState
    this.total += product.price;
  },
  remove(productId) {
    const index = this.items.findIndex(item => item.id === productId);
    if (index >= 0) {
      this.total -= this.items[index].price;
      this.items.splice(index, 1);
    }
  },
  clear() {
    this.items = [];
    this.total = 0;
  }
};

// =============================================================================
// String Manipulation Types
// =============================================================================

// 19. Uppercase<StringType>
// Definition: Converts string literal type to uppercase
// Usage: Standardizing string formats
// Analogy: Like using ALL CAPS for emphasis

type ProductStatus = 'active' | 'inactive' | 'discontinued';
type ProductStatusUpper = Uppercase<ProductStatus>;
// Result: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED'

function logProductStatus(status: ProductStatusUpper) {
  console.log(`Product is ${status}`);
}

// 20. Lowercase<StringType>
// Definition: Converts string literal type to lowercase
// Usage: Normalizing input
// Analogy: Like making everything lowercase for consistency

type SortDirection = 'ASC' | 'DESC';
type SortDirectionLower = Lowercase<SortDirection>; // 'asc' | 'desc'

function sortProducts(direction: SortDirectionLower) {
  console.log(`Sorting products in ${direction} order`);
}

// 21. Capitalize<StringType>
// Definition: Capitalizes the first letter of a string literal type
// Usage: Formatting display strings
// Analogy: Like proper capitalization in a sentence

type NotificationType = 'success' | 'error' | 'warning' | 'info';
type NotificationTypeCapitalized = Capitalize<NotificationType>;
// Result: 'Success' | 'Error' | 'Warning' | 'Info'

function showNotification(type: NotificationTypeCapitalized, message: string) {
  console.log(`${type}: ${message}`);
}

// 22. Uncapitalize<StringType>
// Definition: Makes the first letter lowercase
// Usage: Converting from PascalCase to camelCase
// Analogy: Like removing the formal capitalization

type ApiEndpoint = 'GetProducts' | 'CreateOrder' | 'UpdateUser';
type CamelCaseEndpoint = Uncapitalize<ApiEndpoint>;
// Result: 'getProducts' | 'createOrder' | 'updateUser'

function callEndpoint(endpoint: CamelCaseEndpoint) {
  console.log(`Calling ${endpoint} endpoint`);
}

// =============================================================================
// Usage Examples
// =============================================================================

// Example: Building a complete e-commerce cart system using multiple utility types

interface BaseProduct {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
}

// Cart item with quantity
type CartItem = BaseProduct & { quantity: number };

// Cart state
interface Cart {
  items: CartItem[];
  userId: string;
  createdAt: Date;
  status: 'active' | 'abandoned' | 'checked_out';
}

// Public cart view (without sensitive data)
type PublicCart = Omit<Cart, 'userId'>;

// Cart update payload (partial updates allowed)
type CartUpdate = Partial<Pick<Cart, 'status'>>;

// Cart summary calculation
function calculateCartSummary(cart: Cart): { itemCount: number; total: number } {
  return {
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    total: cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  };
}

type CartSummary = ReturnType<typeof calculateCartSummary>;

// Example usage
const exampleCart: Cart = {
  items: [
    { id: "1", name: "Laptop", price: 999, category: "electronics", quantity: 1 },
    { id: "2", name: "Mouse", price: 25, category: "electronics", quantity: 2 }
  ],
  userId: "user123",
  createdAt: new Date(),
  status: 'active'
};

const summary: CartSummary = calculateCartSummary(exampleCart);
console.log(`Cart has ${summary.itemCount} items totaling $${summary.total}`);

export {
  ProductType,
  User,
  ProductDraft,
  Order,
  CategoryStats,
  ProductCatalog,
  ProductListItem,
  PublicProfile,
  OnlinePaymentMethod,
  OrderNotifications,
  CreateOrderParams,
  CartConstructorParams,
  OrderTotal,
  Review,
  CartThis,
  AddToCartFunction,
  ProductStatusUpper,
  SortDirectionLower,
  NotificationTypeCapitalized,
  CamelCaseEndpoint,
  CartItem,
  Cart,
  PublicCart,
  CartUpdate,
  CartSummary
};