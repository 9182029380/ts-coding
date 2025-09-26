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
// =============== 2. Async helper functions ===============
// Fetch product by ID
function fetchProduct(id) {
    return __awaiter(this, void 0, void 0, function () {
        var res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch("https://fakestoreapi.com/products/".concat(id))];
                case 1:
                    res = _a.sent();
                    if (!res.ok)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    error_1 = _a.sent();
                    console.error("Fetch failed:", error_1);
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Check if product is in stock (using rating.count as proxy for inventory)
function checkInventory(product) {
    return Promise.resolve(product.rating.count > 0); // If count > 0, assume in stock
}
// Apply discount (e.g., 15% off)
function applyDiscount(product, discountPercent) {
    if (discountPercent === void 0) { discountPercent = 15; }
    return Promise.resolve(Number((product.price * (1 - discountPercent / 100)).toFixed(2)));
}
// =============== 4. Main e-commerce workflow ===============
function processProductForCheckout(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var product, isInStock, finalPrice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchProduct(productId)];
                case 1:
                    product = _a.sent();
                    if (!product) {
                        console.log("\u274C Product #".concat(productId, " not found."));
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, checkInventory(product)];
                case 2:
                    isInStock = _a.sent();
                    if (!isInStock) {
                        console.log("\u26A0\uFE0F  \"".concat(product.title, "\" is out of stock!"));
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, applyDiscount(product, 20)];
                case 3:
                    finalPrice = _a.sent();
                    // Step 4: Safe to use — all types are unwrapped and known
                    console.log("\u2705 Ready for checkout!");
                    console.log("\uD83D\uDCE6 Product: ".concat(product.title));
                    console.log("\uD83D\uDCB0 Original: $".concat(product.price));
                    console.log("\uD83C\uDFF7\uFE0F  Discounted: $".concat(finalPrice));
                    console.log("\uD83D\uDCCA Rating: ".concat(product.rating.rate, " \u2B50 (").concat(product.rating.count, " reviews)"));
                    return [2 /*return*/];
            }
        });
    });
}
// =============== 5. Run the example ===============
// Try with product ID 1 (Backpack)
processProductForCheckout(1);
