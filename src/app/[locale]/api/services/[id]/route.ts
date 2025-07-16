// frontend-portfolio/src/app/[locale]/api/services/[id]/route.ts
import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

// GET single service
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id;

    const response = await fetch(
      `${process.env.SERVICE_URL}/services/getService/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch service");
    }

    const service = await response.json();
    return NextResponse.json(service);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PATCH update service
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id;
    const session = await getSession();

    console.log("this is id from patch", id);
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const data = await req.json();

    const { ...updateData } = data;
    const sanitizedData = {
      ...updateData,
    };

    const response = await fetch(
      `${process.env.SERVICE_URL}/services/updateService/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(sanitizedData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update service");
    }

    const updatedService = await response.json();

    return NextResponse.json(updatedService);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE service
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = params.id;
    const session = await getSession();
    if (!session?.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.SERVICE_URL}/services/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete service");
    }

    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
