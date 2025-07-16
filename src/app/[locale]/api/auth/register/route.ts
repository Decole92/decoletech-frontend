import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, hash, name, secret } = await req.json();
    console.log("Request body:", { email, name, hash, secret });

    const url = process.env.AUTH_URL;

    const getRole = secret === process.env.ADMIN_SECRET ? "ADMIN" : "USER";
    console.log("getRole", getRole);
    const response = await fetch(`${url}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        hash,
        name,
        role: getRole,
      }),
      cache: "no-store",
    });

    // console.log("Response status:", response.status);

    const result = await response.json();
    // console.log("Result:", result);

    return Response.json(result);
  } catch (error) {
    console.error("Error details:", {
      message: (error as Error)?.message,
      stack: (error as Error)?.stack,
    });
    return Response.json({ error: "Failed to register user" }, { status: 500 });
  }
}
