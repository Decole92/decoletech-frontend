"use server";
export async function getInquiries() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/inquiries/getInquiries`,

      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}
