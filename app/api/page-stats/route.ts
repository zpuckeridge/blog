// import { getUmamiToken } from "@/lib/get-analytics";
// import { NextResponse } from "next/server";

// export const revalidate = 60;

// const { UMAMI_URL, NEXT_PUBLIC_UMAMI_WEBSITE_ID } = process.env;

// async function getUmamiData(token: string, url: string) {
//   const now = Date.now();
//   const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

//   const params = new URLSearchParams({
//     startAt: oneMonthAgo.toString(),
//     endAt: now.toString(),
//     unit: "day",
//     timezone: "UTC",
//     url,
//   });

//   const endpoint = `${UMAMI_URL}/api/websites/${NEXT_PUBLIC_UMAMI_WEBSITE_ID}/stats?${params}`;

//   const statsResponse = await fetch(endpoint, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: "application/json",
//     },
//   });

//   if (!statsResponse.ok) {
//     console.error(`Umami API responded with status: ${statsResponse.status}`);
//     console.error(`Response text: ${await statsResponse.text()}`);
//     throw new Error(
//       `Failed to fetch Umami stats data: ${statsResponse.statusText}`,
//     );
//   }

//   const stats = await statsResponse.json();
//   return stats; // Only return the number of pageviews
// }

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const url = searchParams.get("url");

//   if (!url) {
//     return NextResponse.json(
//       { error: "URL parameter is required" },
//       { status: 400 },
//     );
//   }

//   try {
//     const token = await getUmamiToken();
//     const stats = await getUmamiData(token, url);
//     return NextResponse.json({
//       views: stats.pageviews,
//       visitors: stats.visitors,
//       visits: stats.visits,
//       bounces: stats.bounces,
//       totalTime: stats.totalTime,
//     });
//   } catch (error) {
//     console.error("Error fetching Umami data:", error);
//     return NextResponse.json(
//       {
//         error: "Failed to fetch Umami data",
//         details: (error as Error).message,
//       },
//       { status: 500 },
//     );
//   }
// }
