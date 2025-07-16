import { createSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password: hash } = await req.json();
    console.log("Request body:", { email, hash });

    const url = process.env.AUTH_URL;
    console.log("Making request to:", url);

    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        hash,
      }),
      cache: "no-store",
    });

    // console.log("Response status:", response.status);
    const result = await response.json();
    // console.log("Result:", result);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Login failed" },
        { status: response.status }
      );
    }

    await createSession({
      user: {
        id: result.data.userId,
        role: result.data.role,
      },
      accessToken: result.data.accessToken,
      refreshToken: result.data.refreshToken,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error details:", {
      message: (error as Error)?.message,
      stack: (error as Error)?.stack,
    });

    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
