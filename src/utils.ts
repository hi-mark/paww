export const cn = (...classes: any) => {
  return classes.join(" ");
};

export async function fetchFromAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`/api/proxy/${path}`, {
    credentials: "include",
    ...options,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "API request failed");
  }

  return res.json();
}
