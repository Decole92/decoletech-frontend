import { createSession } from "@/lib/session";
// import { Role } from "@/lib/type";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
type Role = "ADMIN" | "USER";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  console.log("searchParams", searchParams);
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const userId = searchParams.get("userId");
  const role = searchParams.get("role");

  if (!accessToken || !refreshToken || !userId || !role)
    throw new Error("Google Ouath Failed!");

  const session = await createSession({
    user: {
      id: userId,
      role: role as Role,
    },
    accessToken,
    refreshToken,
  });
  console.log("session", session);
  redirect("/admin/dashboard");
}
