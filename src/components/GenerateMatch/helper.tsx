import { Dog } from "@/hooks/useFetchDogData";

interface Match {
  match: string;
}

export const fetchMatchedDog = async (
  favoriteDogs: Set<string>
): Promise<Dog | null> => {
  try {
    // Step 1: Get matched dog ID
    const matchRes = await fetch("/api/proxy/dogs/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(Array.from(favoriteDogs)),
      credentials: "include",
    });

    if (!matchRes.ok) throw new Error("Failed to fetch match");

    const matchData: Match = await matchRes.json();

    // Step 2: Get dog details using matched ID
    const dogRes = await fetch("/api/proxy/dogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([matchData.match]),
      credentials: "include",
    });

    if (!dogRes.ok) throw new Error("Failed to fetch dog data");

    const dogData: Dog[] = await dogRes.json();

    return dogData[0] || null;
  } catch (error) {
    console.error("Error fetching matched dog:", error);
    return null;
  }
};
