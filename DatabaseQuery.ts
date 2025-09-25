// User type definition
interface User {
    id: string;
    name: string;
    email: string;
}

// Query Options
interface QueryOptions {
    limit?: number;
    offset?: number;
    sort?: string;
}

// Database Query Builder
class DatabaseQuery {
    // Overload signatures
    find(id: string): Promise<User>;
    find(query: object): Promise<User[]>;
    find(query: object, options: QueryOptions): Promise<User[]>;

    // Implementation
    async find(
        idOrQuery: string | object, 
        options?: QueryOptions
    ): Promise<User | User[]> {
        if (typeof idOrQuery === 'string') {
            return this.findById(idOrQuery);
        }
        return this.findByQuery(idOrQuery, options);
    }

    // Private helper methods
    private async findById(id: string): Promise<User> {
        // Simulating DB fetch
        console.log(`🔍 Finding user by ID: ${id}`);
        return {
            id,
            name: "John Doe",
            email: "johndoe@example.com"
        };
    }

    private async findByQuery(query: object, options?: QueryOptions): Promise<User[]> {
        // Simulating DB fetch with query
        console.log(`🔍 Finding users with query:`, query);
        if (options) {
            console.log(`⚙️ Options applied:`, options);
        }
        return [
            { id: "101", name: "Alice", email: "alice@example.com" },
            { id: "102", name: "Bob", email: "bob@example.com" }
        ];
    }
}

// Example usage
async function main() {
    const db = new DatabaseQuery();

    // Case 1: Find by ID
    const user = await db.find("123");
    console.log("Result (Find by ID):", user);

    // Case 2: Find by Query
    const usersByQuery = await db.find({ role: "admin" });
    console.log("Result (Find by Query):", usersByQuery);

    // Case 3: Find by Query + Options
    const usersWithOptions = await db.find({ active: true }, { limit: 2, sort: "name" });
    console.log("Result (Find with Options):", usersWithOptions);
}

// Run the demo
main();
