export async function GET(
  req: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, context);
}

export async function POST(
  req: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  return handleProxy(req, context);
}

async function handleProxy(
  req: Request,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const endpoint = path.join("/");
  const apiUrl = `https://frontend-take-home-service.fetch.com/${endpoint}`;

  const headers = new Headers(req.headers);
  headers.delete("host");
  headers.set("origin", "https://frontend-take-home-service.fetch.com");

  let requestBody: string | undefined = undefined;
  if (!["GET", "HEAD"].includes(req.method || "")) {
    requestBody = await req.text();
  }

  const proxyResponse = await fetch(apiUrl, {
    method: req.method,
    headers,
    credentials: "include",
    body: requestBody,
  });

  const responseBody = await proxyResponse.text();

  const resHeaders = new Headers();
  proxyResponse.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      resHeaders.append("set-cookie", value);
    } else {
      resHeaders.set(key, value);
    }
  });

  return new Response(responseBody, {
    status: proxyResponse.status,
    headers: resHeaders,
  });
}
