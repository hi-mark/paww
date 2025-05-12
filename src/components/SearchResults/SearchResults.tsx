import { sortOptions } from "@/constants";
import Pagination from "./Pagination";
import ResultsGrid from "./ResultsGrid";
import styles from "./SearchResults.module.css";

const SearchResults = (props: any) => {
  const {
    error,
    loading,
    favorites,
    toggleFavorite,
    dogs,
    total,
    fieldsPerPage,
    setFieldsPerPage,
    currentPage,
    setCurrentPage,
    sortingOrder,
    setSortingOrder,
  } = props;

  return (
    <section className={styles.searchResults}>
      <div className={styles.container}>
        <div className={styles.searchHeading}>
          <p className={styles.resultsCount}>{total || 0} results Found</p>
          <select
            name="pets"
            id="sort-dropdown"
            className={styles.sortButton}
            aria-label="Sorting Options"
            value={sortingOrder}
            onChange={(e) => setSortingOrder(e.target.value)}
          >
            {Object.entries(sortOptions).map(([key, val]) => (
              <option key={key} value={val}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <ResultsGrid
          error={!!error}
          loading={loading}
          favoriteDogs={favorites}
          toggleFavorite={toggleFavorite}
          data={dogs}
        />
        <Pagination
          total={total}
          currentPage={currentPage}
          setFieldsPerPage={setFieldsPerPage}
          setCurrentPage={setCurrentPage}
          fieldsPerPage={fieldsPerPage}
        />
      </div>
    </section>
  );
};

export default SearchResults;
