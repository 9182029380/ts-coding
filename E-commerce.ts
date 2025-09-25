// --- Fake APIs (simulated with setTimeout) ---
type User = { id: number; name: string };
type Product = { id: number; name: string; price: number };
type CartItem = { productId: number; quantity: number };

function getUser(): Promise<User> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: 1, name: "Sharath" });
    }, 1000);
  });
}

function getProducts(): Promise<Product[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Laptop", price: 50000 },
        { id: 2, name: "Phone", price: 20000 },
        { id: 3, name: "Headphones", price: 3000 }
      ]);
    }, 1200);
  });
}

function getCart(userId: number): Promise<CartItem[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { productId: 1, quantity: 1 },
        { productId: 3, quantity: 2 }
      ]);
    }, 800);
  });
}

// --- E-commerce Flow with async/await ---
async function showUserCart() {
  try {
    console.log("Fetching user, cart, and products...");

    // Run in parallel using Promise.all
    const [user, products] = await Promise.all([getUser(), getProducts()]);
    const cart = await getCart(user.id);

    console.log(`\n👤 User: ${user.name}\n`);

    console.log("🛒 Cart Items:");
    cart.forEach(item => {
      const product = products.find(p => p.id === item.productId);
      if (product) {
        console.log(
          `- ${product.name} x ${item.quantity} = ₹${product.price * item.quantity}`
        );
      }
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
}

showUserCart();
