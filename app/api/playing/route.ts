import { getNowPlaying } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await getNowPlaying();
  const data = await res.json();

  return NextResponse.json({ data });
}
