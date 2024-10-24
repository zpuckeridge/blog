const { UMAMI_URL, UMAMI_USERNAME, UMAMI_PASSWORD } = process.env;

export async function getUmamiToken() {
  const response = await fetch(`${UMAMI_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: UMAMI_USERNAME,
      password: UMAMI_PASSWORD,
    }),
  });

  if (!response.ok) throw new Error("Failed to authenticate with Umami");

  const { token } = await response.json();
  return token;
}
