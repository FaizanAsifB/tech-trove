// Create a type for the roles

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: "USER" | "ADMIN";
    };
  }
}
