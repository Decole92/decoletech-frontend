import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const newsletter = await req.json();

    const response = await fetch(
      `${process.env.INQUIRY_URL}/inquiries/createNewsletter`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsletter),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create newsletter ${response.statusText}`);
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("Error creating newsletter:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
