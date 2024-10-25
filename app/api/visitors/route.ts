import { getUmamiToken } from "@/lib/get-analytics";
import { NextResponse } from "next/server";

export const revalidate = 60;

const { UMAMI_URL, NEXT_PUBLIC_UMAMI_WEBSITE_ID } = process.env;

async function getActiveVisitors(token: string) {
  const endpoint = `${UMAMI_URL}/api/websites/${NEXT_PUBLIC_UMAMI_WEBSITE_ID}/active`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    console.error(`Umami API responded with status: ${response.status}`);
    console.error(`Response text: ${await response.text()}`);
    throw new Error(
      `Failed to fetch active visitors data: ${response.statusText}`,
    );
  }

  const data = await response.json();
  return data.x; // The 'x' property contains the number of active visitors
}

export async function GET() {
  try {
    const token = await getUmamiToken();
    const activeVisitors = await getActiveVisitors(token);
    return NextResponse.json({ visitors: activeVisitors });
  } catch (error) {
    console.error("Error fetching active visitors data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch active visitors data",
        details: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
