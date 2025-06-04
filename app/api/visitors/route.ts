import { GET as edgeGet } from "./edge";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  return edgeGet(request);
}
