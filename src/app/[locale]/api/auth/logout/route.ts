import { authFetch } from "@/lib/authFetcher";

import { deleteSession } from "@/lib/session";

export async function GET() {
  const response = await authFetch(`${process.env.AUTH_URL}/auth/logout`, {
    method: "POST",
    // credential: "include",
  });

  await deleteSession();
  return response;
}
