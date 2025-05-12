// app/api/dogs/search/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const baseUrl = "https://frontend-take-home-service.fetch.com/"; // replace with actual base URL
  const url = new URL("/dogs/search", baseUrl);
  const searchParams = req.nextUrl.searchParams;

  // Re-append all query params to real API endpoint
  searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  try {
    const res = await fetch(url.toString(), {
      method: "GET",
      credentials: "include",
      headers: {
        // Forward auth cookies if needed
        Cookie: req.headers.get("cookie") || "",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error: any) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request" },
      { status: 500 }
    );
  }
}
