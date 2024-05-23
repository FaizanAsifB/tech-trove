import { auth } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";

export const checkRole = (role: Role) => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
};
