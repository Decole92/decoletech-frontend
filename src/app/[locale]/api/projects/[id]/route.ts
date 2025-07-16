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
      `${process.env.PROJECT_URL}/projects/getProject/${id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch project");
    }

    const project = await response.json();

    return NextResponse.json(project);
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

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const formData = await req.formData();

    // Get the old image URL if it exists
    const oldImageUrl = formData.get("bgcover_url") || null;
    const imageFile = formData.get("imageFile") as File;

    // Parse categories
    const categories = formData.get("category");
    const parsedCategories = categories ? JSON.parse(categories as string) : [];

    const projectData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: parsedCategories,
      fullDescription: formData.get("fullDescription"),
      architecture: formData.get("architecture"),
      status: formData.get("status"),
      stacks: JSON.parse(formData.get("stacks") as string),
      githubUrl: formData.get("githubUrl"),
      liveUrl: formData.get("liveUrl"),
      featured: formData.get("featured") === "true",
      bgcover_url: imageFile ? null : oldImageUrl,
    };

    const form = new FormData();

    // Add image file if present
    if (imageFile) {
      form.append("image", imageFile);
    }

    // Append project data (only non-null values)
    Object.entries(projectData).forEach(([key, value]) => {
      if (value !== null) {
        form.append(
          key,
          typeof value === "string" ? value : JSON.stringify(value)
        );
      }
    });

    const response = await fetch(
      `${process.env.PROJECT_URL}/projects/updateProject/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: form,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update project");
    }

    const updatedProject = await response.json();

    return NextResponse.json(updatedProject);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
// // DELETE service
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
      `${process.env.PROJECT_URL}/projects/deleteProject/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete project");
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
