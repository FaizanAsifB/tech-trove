import { auth } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";

export const checkRole = (role: Role) => {
  const { sessionClaims } = auth();

  const userMetadata = sessionClaims?.metadata as CustomJwtSessionClaims;

  return userMetadata?.role === role;
};
