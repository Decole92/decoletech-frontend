import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    const session = await getSession();

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    console.log("Service data:", formData);

    const service = {
      title: formData.title,
      description: formData.description,
      full_description: formData.full_description,
      category: formData.category,
      price_per_hour: formData.price_per_hour,
    };

    const response = await fetch(`${process.env.SERVICE_URL}/services/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(service), // Convert to JSON string
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create service");
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
