interface User {
    id: string;
    name: string;
}

// Type alias for roles
type Role = "admin" | "editor" | "viewer";

// User with roles
const user: User & { role: Role } = {
    id: "u101",
    name: "Sharath",
    role: "admin"
};

console.log(user);
