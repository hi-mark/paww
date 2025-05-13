"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { cn } from "@/utils";
import styles from "./SearchBar.module.css";
import { SearchFormData } from "@/hooks/useFetchDogData";
import { DefaultSearchFormData } from "@/constants";
import { BreedSelectorModal } from "./BreedsDisplay";

interface SearchBarProps {
  setSearchFormData: (data: SearchFormData) => void;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const SearchBar: React.FC<SearchBarProps> = ({
  setSearchFormData,
  setCurrentPage,
}) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [minAge, setMinAge] = useState<number | undefined>();
  const [maxAge, setMaxAge] = useState<number | undefined>();
  const [selectedBreeds, setSelectedBreeds] = useState<Set<string>>(new Set());
  const [breedsModalOpen, setBreedsModalOpen] = useState(false);

  const toggleBreed = (breed: string) => {
    setSelectedBreeds((prev) => {
      const updated = new Set(prev);
      updated.has(breed) ? updated.delete(breed) : updated.add(breed);
      return updated;
    });
  };

  const fetchBreeds = async () => {
    try {
      const response = await fetch("/api/proxy/dogs/breeds", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch breeds");

      const data = await response.json();
      setBreeds(data);
    } catch (error) {
      console.error("Error fetching dog breeds:", error);
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  const updateFilters = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearchFormData({
      breeds: Array.from(selectedBreeds),
      minAge: minAge ?? null,
      maxAge: maxAge ?? null,
    });
  };

  const clearFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setMinAge(undefined);
    setMaxAge(undefined);
    setSelectedBreeds(new Set());
    setSearchFormData(DefaultSearchFormData);
  };

  return (
    <form className={styles.searchForm}>
      <div className={styles.searchFieldsWrapper}>
        <button
          aria-label="Select breeds"
          className={cn(styles.inputWrapper, styles.breedWrapper)}
          onClick={(e) => {
            e.preventDefault();
            setBreedsModalOpen(true);
          }}
        >
          <p className={styles.label}>Breed</p>
          <p className={styles.selectedBreeds}>
            {selectedBreeds.size > 0
              ? `${selectedBreeds.size} breeds selected`
              : "All breeds"}
          </p>
        </button>

        <BreedSelectorModal
          open={breedsModalOpen}
          onClose={() => setBreedsModalOpen(false)}
          breeds={breeds}
          selectedBreeds={selectedBreeds}
          toggleBreed={toggleBreed}
        />

        <div className={cn(styles.inputWrapper, styles.minAgeWrapper)}>
          <label htmlFor="minAge" className={styles.label}>
            Min Age
          </label>
          <input
            id="minAge"
            type="number"
            min={0}
            max={25}
            placeholder="-"
            className={styles.labelledInput}
            value={minAge ?? ""}
            onChange={(e) => setMinAge(parseInt(e.target.value) || undefined)}
          />
        </div>

        <div className={cn(styles.inputWrapper, styles.maxAgeWrapper)}>
          <label htmlFor="maxAge" className={styles.label}>
            Max Age
          </label>
          <input
            id="maxAge"
            type="number"
            min={0}
            max={25}
            placeholder="-"
            className={styles.labelledInput}
            value={maxAge ?? ""}
            onChange={(e) => setMaxAge(parseInt(e.target.value) || undefined)}
          />
        </div>
      </div>

      <div className={styles.buttonsWrapper}>
        <button className={styles.searchButton} onClick={updateFilters}>
          Apply
        </button>
        <button className={styles.clearFormButton} onClick={clearFilter}>
          Clear Form
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
