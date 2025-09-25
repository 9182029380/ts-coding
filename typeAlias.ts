// Type alias for a Product
type ProductType = {
    id: string;
    name: string;
    price: number;
    category?: string;
};

// Union type example using Type alias
type DiscountedProduct = ProductType & { discountPercentage: number };

// Usage
const discountedBook: DiscountedProduct = {
    id: "102",
    name: "Advanced TS",
    price: 799,
    discountPercentage: 20
};

console.log(discountedBook);


// | Feature                     | Interface                                                                | Type Alias                                                    |
// | --------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------- |
// | **Extending / Inheritance** | ✅ Can extend another interface using `extends`                           | ✅ Can create intersection types using `&`                     |
// | **Declaration Merging**     | ✅ Can declare the same interface multiple times → merges properties      | ❌ Cannot merge type aliases; redeclaration gives error        |
// | **Complex Types**           | ❌ Limited to object types                                                | ✅ Can represent primitives, union types, tuples, mapped types |
// | **Recommended Use**         | ✅ When defining the shape of objects/classes and for OOP-style extension | ✅ When you need unions, primitives, or complex combinations   |
