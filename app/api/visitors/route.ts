import { GET as edgeGet } from "./edge";

export const dynamic = "force-dynamic";

export async function GET(request: Request, context: { env: any }) {
  return edgeGet(request, context);
}
