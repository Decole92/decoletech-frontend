import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${process.env.PROJECT_URL}/projects`);
    const project = await response.json();
    console.log("projects", project);
    return NextResponse.json(project);
  } catch (err) {
    throw new Error(`Error occurs while gettting projects ${err}`);
  }
}
