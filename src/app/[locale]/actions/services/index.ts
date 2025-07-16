"use server";

import { Services } from "../../../../../typing";

export const getServices = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/services/getServices`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    return null;
  }
};

export async function getService(id: string): Promise<Services | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/services/${id}`,
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
