import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const InquiryData = {
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientCompany: formData.clientCompany || null,
      serviceId: formData.serviceType,
      message: formData.message,
      status: formData.status,
    };
    console.log("inquiryData", InquiryData);
    const response = await fetch(
      `${process.env.INQUIRY_URL}/inquiries/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(InquiryData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create inquiry: ${response.statusText}`);
    }

    return NextResponse.json(await response.json());
  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
