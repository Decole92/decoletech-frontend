import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(`${process.env.SERVICE_URL}/services`);
    const services = await response.json();
    // if (!services?.length) return NextResponse.json("Nothing found yet");
    // console.log("services", services);
    return NextResponse.json(services);
  } catch (err) {
    throw new Error(`Error occurs while gettting services ${err}`);
  }
}
