// // import { refreshToken } from "./auth";

import { getSession, updateTokens } from "./session";

export interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const refreshToken = async (oldRefreshToken: string) => {
  try {
    const response = await fetch(`${process.env.AUTH_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${oldRefreshToken}`, // Ensure this is correct
      },
    });

    const result = await response.json();
    console.log("response from rt-token from auth_url/refresh", result);

    if (!response.ok) {
      throw new Error("Failed to refresh token: " + result.message);
    }

    const { accessToken, refreshToken } = result;

    // Update session with new tokens
    console.log(
      "accesstoken, rt-token from auth/refresh",
      accessToken,
      refreshToken
    );

    await updateTokens({
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });

    // if (!updateRes.ok) throw new Error("Failed to update the tokens");

    return result?.accessToken;
  } catch (err) {
    console.error("Refresh Token failed:", err);
    return null;
  }
};
export const authFetch = async (
  url: string | URL,
  options: FetchOptions = {}
) => {
  const session = await getSession();
  console.log("session", session);
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${session?.accessToken}`,
  };

  console.log("sesssion", session?.accessToken, "url", url);
  let response = await fetch(url, options);

  console.log({
    StaTTTTTTTTTTTTTTTTTTTTUS: response.status,
  });

  if (response.status === 401) {
    if (!session?.refreshToken) throw new Error("refresh token not found!");

    const newAccessToken = await refreshToken(session.refreshToken);

    console.log("newAccessToken", newAccessToken);
    if (newAccessToken) {
      console.log(
        "newly obtain newAccessToken inside if statement ",
        newAccessToken
      );
      options.headers.Authorization = `Bearer ${newAccessToken}`;
      response = await fetch(url, options);
      console.log("result coming from auth/logout", response?.status);
    }
  }
  return response;
};
