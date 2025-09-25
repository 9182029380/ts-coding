"use strict";
// TypeScript Utility Types in E-commerce Application
// Complete examples with definitions, usage, and analogies
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
function fetchProduct(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // Simulate API call
            return [2 /*return*/, { id: id, name: "iPhone 15", price: 999 }];
        });
    });
}
// Same as: type ProductType = Product;
var handleProduct = function (product) {
    console.log("Product: ".concat(product.name, ", Price: $").concat(product.price));
};
// Update user - only some fields might be provided
function updateUser(userId, updates) {
    var existingUser = { id: userId, email: "old@email.com", name: "Old Name", address: "Old Address" };
    return __assign(__assign({}, existingUser), updates);
}
var updatedUser = updateUser("123", { name: "John Doe" }); // Only name is updated
function saveProduct(product) {
    // All fields are guaranteed to exist
    console.log("Saving: ".concat(product.name, " at $").concat(product.price));
}
function processOrder(order) {
    // order.total = 500; // Error! Cannot assign to read-only property
    console.log("Processing order ".concat(order.id, " for $").concat(order.total));
}
var categoryInventory = {
    electronics: 150,
    clothing: 300,
    books: 75,
    home: 200
};
var catalog = {
    "prod1": { id: "prod1", name: "Laptop", price: 999 },
    "prod2": { id: "prod2", name: "T-Shirt", price: 29 }
};
function displayProductList(products) {
    products.forEach(function (product) {
        console.log("".concat(product.name, ": $").concat(product.price, " ").concat(product.inStock ? '✓' : '✗'));
    });
}
function getPublicProfile(user) {
    var password = user.password, creditCard = user.creditCard, publicInfo = __rest(user, ["password", "creditCard"]);
    return publicInfo;
}
// Result: 'credit_card' | 'debit_card' | 'paypal'
function processOnlinePayment(method) {
    // method can never be 'cash' or 'bitcoin' here
    console.log("Processing online payment via ".concat(method));
}
// Result: 'order_confirmed' | 'item_shipped'
function handleOrderNotification(type) {
    console.log("Handling order notification: ".concat(type));
}
function displayProduct(product) {
    // product is guaranteed to be Product, not null or undefined
    console.log("Displaying: ".concat(product.name, " - $").concat(product.price));
}
// =============================================================================
// 11. Parameters<Type>
// =============================================================================
// Definition: Extracts parameter types from a function type
// Usage: Getting function parameter types for reuse
// Analogy: Like getting a list of ingredients from a recipe
function createOrder(userId, items, couponCode) {
    return { userId: userId, items: items, couponCode: couponCode };
}
// Result: [string, Product[], string?]
// Use the same parameters for validation
function validateOrderParams() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    var userId = params[0], items = params[1], couponCode = params[2];
    return userId.length > 0 && items.length > 0;
}
// =============================================================================
// 12. ConstructorParameters<Type>
// =============================================================================
// Definition: Extracts constructor parameter types from a class
// Usage: Getting constructor parameters for factory functions
// Analogy: Like getting the blueprint requirements for building something
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart(userId, currency, maxItems) {
        if (currency === void 0) { currency = 'USD'; }
        if (maxItems === void 0) { maxItems = 50; }
        this.userId = userId;
        this.currency = currency;
        this.maxItems = maxItems;
    }
    return ShoppingCart;
}());
// Result: [string, string?, number?]
function createCartFactory() {
    var params = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        params[_i] = arguments[_i];
    }
    return new (ShoppingCart.bind.apply(ShoppingCart, __spreadArray([void 0], params, false)))();
}
// =============================================================================
// 13. ReturnType<Type>
// =============================================================================
// Definition: Extracts the return type of a function
// Usage: Getting function return types
// Analogy: Like knowing what you'll get from a vending machine
function calculateOrderTotal(items, taxRate) {
    var subtotal = items.reduce(function (sum, item) { return sum + item.price; }, 0);
    return {
        subtotal: subtotal,
        tax: subtotal * taxRate,
        total: subtotal * (1 + taxRate)
    };
}
// Result: { subtotal: number; tax: number; total: number; }
function displayOrderSummary(summary) {
    console.log("Subtotal: $".concat(summary.subtotal, ", Tax: $").concat(summary.tax, ", Total: $").concat(summary.total));
}
// =============================================================================
// 14. InstanceType<Type>
// =============================================================================
// Definition: Extracts the instance type of a class constructor
// Usage: Getting class instance types
// Analogy: Like knowing what type of car you get from a car factory
var ProductReview = /** @class */ (function () {
    function ProductReview(productId, userId, rating, comment) {
        this.productId = productId;
        this.userId = userId;
        this.rating = rating;
        this.comment = comment;
    }
    ProductReview.prototype.display = function () {
        return "".concat(this.rating, "/5 stars: ").concat(this.comment);
    };
    return ProductReview;
}());
function saveReview(review) {
    console.log("Saving review: ".concat(review.display()));
}
// =============================================================================
// 15. NoInfer<Type>
// =============================================================================
// Definition: Prevents TypeScript from inferring a type in generic contexts
// Usage: Controlling type inference in generic functions
// Analogy: Like telling someone "don't guess, I'll tell you exactly what it is"
function createProductVariant(baseProduct, variantType, variantValue // Prevents inference from this parameter
) {
    return __assign(__assign({}, baseProduct), { variant: variantValue });
}
// TypeScript won't infer T from the second argument
var variant = createProductVariant({ id: "1", name: "Shirt", price: 25 }, "size", // T is inferred as "size"
"size" // This must match T exactly, no inference here
);
function addToCart(product) {
    this.items.push(product);
    this.total += product.price;
}
function setupCart() {
    return { items: [], total: 0 };
}
// Result: (product: Product) => void
var addProductToCart = function (product) {
    console.log("Adding ".concat(product.name, " to cart"));
};
// Methods will have 'this' typed as CartState
var cartMethods = {
    add: function (product) {
        this.items.push(product); // 'this' is typed as CartState
        this.total += product.price;
    },
    remove: function (productId) {
        var index = this.items.findIndex(function (item) { return item.id === productId; });
        if (index >= 0) {
            this.total -= this.items[index].price;
            this.items.splice(index, 1);
        }
    },
    clear: function () {
        this.items = [];
        this.total = 0;
    }
};
// Result: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED'
function logProductStatus(status) {
    console.log("Product is ".concat(status));
}
function sortProducts(direction) {
    console.log("Sorting products in ".concat(direction, " order"));
}
// Result: 'Success' | 'Error' | 'Warning' | 'Info'
function showNotification(type, message) {
    console.log("".concat(type, ": ").concat(message));
}
// Result: 'getProducts' | 'createOrder' | 'updateUser'
function callEndpoint(endpoint) {
    console.log("Calling ".concat(endpoint, " endpoint"));
}
// Cart summary calculation
function calculateCartSummary(cart) {
    return {
        itemCount: cart.items.reduce(function (sum, item) { return sum + item.quantity; }, 0),
        total: cart.items.reduce(function (sum, item) { return sum + (item.price * item.quantity); }, 0)
    };
}
// Example usage
var exampleCart = {
    items: [
        { id: "1", name: "Laptop", price: 999, category: "electronics", quantity: 1 },
        { id: "2", name: "Mouse", price: 25, category: "electronics", quantity: 2 }
    ],
    userId: "user123",
    createdAt: new Date(),
    status: 'active'
};
var summary = calculateCartSummary(exampleCart);
console.log("Cart has ".concat(summary.itemCount, " items totaling $").concat(summary.total));
