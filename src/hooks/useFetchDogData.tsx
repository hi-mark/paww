import { useEffect, useState } from "react";

export interface SearchFormData {
  breeds: string[];
  minAge: number | null;
  maxAge: number | null;
}

export interface Dog {
  id: string;
  name: string;
  age: number;
  breed: string;
  zip_code: string;
  img: string;
}

interface DogSearchResponse {
  resultIds: string[];
  total: number;
}

export function useDogSearch(
  currentPage: number,
  pageSize: number,
  sortingOrder: string,
  searchFormData: SearchFormData
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);
      setError(null);
      console.log(searchFormData);

      try {
        const params = new URLSearchParams();

        if (searchFormData.breeds?.length) {
          searchFormData.breeds.forEach((breed) =>
            params.append("breeds", breed)
          );
        }

        if (searchFormData.minAge !== null) {
          params.append("ageMin", String(searchFormData.minAge || 0));
        }

        if (searchFormData.maxAge !== null) {
          params.append("ageMax", String(searchFormData.maxAge || 100));
        }

        params.append("size", pageSize.toString());
        params.append("from", ((currentPage - 1) * pageSize).toString());

        if (sortingOrder) {
          params.append("sort", sortingOrder);
        }

        // Step 1: Fetch dog IDs
        const searchRes = await fetch(`/api/dogs/search?${params.toString()}`, {
          credentials: "include",
        });
        if (!searchRes.ok) throw new Error("Failed to fetch dog IDs");

        const { resultIds, total }: DogSearchResponse = await searchRes.json();
        setTotal(total);

        if (!resultIds.length) {
          setDogs([]);
          return;
        }

        // Step 2: Fetch dog details
        const dogsRes = await fetch("/api/dogs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resultIds),
          credentials: "include",
        });

        if (!dogsRes.ok) throw new Error("Failed to fetch dog details");

        const dogData: Dog[] = await dogsRes.json();
        setDogs(dogData);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDogs();
  }, [currentPage, pageSize, sortingOrder, searchFormData]);

  return { loading, error, dogs, total };
}
