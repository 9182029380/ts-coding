// Interface for a Product
interface Product {
    id: string;
    name: string;
    price: number;
    category?: string; // optional
}

// Extending interface
interface DigitalProduct extends Product {
    fileSizeMB: number;
}

// Usage
const ebook: DigitalProduct = {
    id: "101",
    name: "Learn TypeScript",
    price: 499,
    fileSizeMB: 50
};

console.log(ebook);
