"use server";

import { getSession } from "@/lib/session";

export const getUser = async () => {
  try {
    const session = await getSession();
    const accessToken = session?.accessToken;
    const response = await fetch(`${process.env.AUTH_URL}/auth/getUser`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Ensure this is correct
      },
    });
    const getUser = await response.json();
    return getUser;
  } catch (err) {
    throw new Error(
      "failed to obtain getUser from action server",
      err as Error
    );
  }
};
