import { getTopTracks } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await getTopTracks();
  const data = await res.json();

  return NextResponse.json({ data });
}
