// Payment Processing System

// Step 1: Define Payment Result type
interface PaymentResult {
    success: boolean;
    amount: number;
    currency: string;
    method: string;
    transactionId: string;
}

// Step 2: Define Payment Options type
interface PaymentOptions {
    currency?: string;
    processingFee?: number;
}

// Step 3: Utility function to generate unique IDs
function generateId(): string {
    return "TXN-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Step 4: Main Payment Function
function processPayment(
    amount: number, 
    method: string = "credit_card",
    options: PaymentOptions = {}
): Promise<PaymentResult> {
    const { currency = "USD", processingFee = 2.5 } = options;
    
    return new Promise((resolve) => {
        const finalAmount = amount + (amount * processingFee / 100);
        resolve({
            success: true,
            amount: finalAmount,
            currency,
            method,
            transactionId: generateId()
        });
    });
}

// Step 5: Example Usage
async function main() {
    const payment1 = await processPayment(100);
    console.log("Payment 1:", payment1);

    const payment2 = await processPayment(200, "paypal", { currency: "EUR", processingFee: 3 });
    console.log("Payment 2:", payment2);

    const payment3 = await processPayment(500, "upi", { processingFee: 1.5 });
    console.log("Payment 3:", payment3);
}

// Run the example
main();
