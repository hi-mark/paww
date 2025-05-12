import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieHeader = (await cookies()).toString();
  const body = await req.text();

  const res = await fetch(`${process.env.BASE_URL}/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    credentials: "include",
    body,
  });

  return new Response(await res.text(), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
