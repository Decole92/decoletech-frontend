import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const response = await fetch(`${process.env.INQUIRY_URL}/inquiries`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken!}`,
      },
    });
    const inquiries = await response.json();
    // console.log("inquiries", inquiries);
    return NextResponse.json(inquiries);
  } catch (err) {
    throw new Error(`Error occurs while gettting services ${err}`);
  }
}
