import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const response = await fetch(
      `${process.env.INQUIRY_URL}/inquiries/getNewsletters`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken!}`,
        },
      }
    );
    const project = await response.json();
    console.log("newsletter", project);
    return NextResponse.json(project);
  } catch (err) {
    throw new Error(`Error occurs while gettting newsletters ${err}`);
  }
}
