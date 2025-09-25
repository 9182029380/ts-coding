// Payment Processing System
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
// Step 3: Utility function to generate unique IDs
function generateId() {
    return "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}
// Step 4: Main Payment Function
function processPayment(amount, method, options) {
    if (method === void 0) { method = "credit_card"; }
    if (options === void 0) { options = {}; }
    var _a = options.currency, currency = _a === void 0 ? "USD" : _a, _b = options.processingFee, processingFee = _b === void 0 ? 2.5 : _b;
    return new Promise(function (resolve) {
        var finalAmount = amount + (amount * processingFee / 100);
        resolve({
            success: true,
            amount: finalAmount,
            currency: currency,
            method: method,
            transactionId: generateId()
        });
    });
}
// Step 5: Example Usage
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var payment1, payment2, payment3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, processPayment(100)];
                case 1:
                    payment1 = _a.sent();
                    console.log("Payment 1:", payment1);
                    return [4 /*yield*/, processPayment(200, "paypal", { currency: "EUR", processingFee: 3 })];
                case 2:
                    payment2 = _a.sent();
                    console.log("Payment 2:", payment2);
                    return [4 /*yield*/, processPayment(500, "upi", { processingFee: 1.5 })];
                case 3:
                    payment3 = _a.sent();
                    console.log("Payment 3:", payment3);
                    return [2 /*return*/];
            }
        });
    });
}
// Run the example
main();
