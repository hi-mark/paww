"use client";

import { useState } from "react";
import styles from "./page.module.css";
import SearchBar from "@/components/SearchBar/SearchBar";
import { SearchFormData, useDogSearch } from "@/hooks/useFetchDogData";
import SearchResults from "@/components/SearchResults/SearchResults";
import GenerateMatch from "@/components/GenerateMatch/GenerateMatch";
import {
  DEFAULT_FIELDS_PER_PAGE,
  DEFAULT_SORTING_ORDER,
  DefaultSearchFormData,
} from "@/constants";

export default function HomePage() {
  const [searchFormData, setSearchFormData] = useState<SearchFormData>(
    DefaultSearchFormData
  );
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [fieldsPerPage, setFieldsPerPage] = useState(DEFAULT_FIELDS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingOrder, setSortingOrder] = useState(DEFAULT_SORTING_ORDER);

  const { loading, error, dogs, total } = useDogSearch(
    currentPage,
    fieldsPerPage,
    sortingOrder,
    searchFormData
  );

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Find your Paww Partner.</h1>
          <h2 className={styles.pageSubTitle}>
            Adjust filters to help us find your paww-fect partner and generate a
            match
          </h2>
          <SearchBar
            setSearchFormData={setSearchFormData}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>

      <SearchResults
        error={error}
        loading={loading}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        dogs={dogs}
        total={total}
        currentPage={currentPage}
        setFieldsPerPage={setFieldsPerPage}
        setCurrentPage={setCurrentPage}
        fieldsPerPage={fieldsPerPage}
        setSortingOrder={setSortingOrder}
      />

      <GenerateMatch favorites={favorites} />
      <footer>Footer Here</footer>
    </div>
  );
}
