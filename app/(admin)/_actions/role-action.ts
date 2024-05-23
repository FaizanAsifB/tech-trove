"use server";

import { checkRole } from "@/lib/roles";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(userId: string, role: "ADMIN" | "USER") {
  if (!checkRole("ADMIN")) {
    return { message: "Not Authorized" };
  }

  try {
    const res = await clerkClient.users.updateUser(userId, {
      publicMetadata: { role },
    });
    return { message: res.publicMetadata };
  } catch (err) {
    return { message: err };
  }
}
