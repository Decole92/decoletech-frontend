import { getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const session = await getSession();

    if (!session?.accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Create form data to send to backend
    const form = new FormData();

    // Add image file if present
    const imageFile = formData.get("image") as File;
    if (imageFile) {
      form.append("image", imageFile);
    }
    const parsedCategories = formData?.get("categories")
      ? JSON.parse(formData?.get("categories") as string)
      : [];
    // Add project data
    const projectData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: parsedCategories,
      fullDescription: formData.get("fullDescription"),
      architecture: formData.get("architecture"),
      status: formData.get("status"),
      stacks: JSON.parse(formData.get("technologies") as string),
      githubUrl: formData.get("githubUrl"),
      liveUrl: formData.get("liveUrl"),
      featured: formData.get("featured") === "true",
    };

    console.log("projectData", projectData);
    // Append project data
    Object.entries(projectData).forEach(([key, value]) => {
      form.append(
        key,
        typeof value === "string" ? value : JSON.stringify(value)
      );
    });
    console.log("projectData", projectData);
    const response = await fetch(`${process.env.PROJECT_URL}/projects/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: form,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create project");
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
