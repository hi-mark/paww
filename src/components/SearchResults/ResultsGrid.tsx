import { Dog } from "@/hooks/useFetchDogData";
import styles from "./SearchResults.module.css";
import { cn } from "@/utils";
interface SearchResultsProps {
  loading: boolean;
  error: boolean;
  data: Dog[];
  favoriteDogs: Set<string>; // dog IDs that are currently favorited
  toggleFavorite: (id: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  loading,
  error,
  data,
  toggleFavorite,
  favoriteDogs,
}) => {
  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!!error) return <p className={styles.error}>Something went wrong</p>;
  return (
    <div className={styles.cardsWrapper}>
      {data.map((dog) => {
        const isFav = favoriteDogs.has(dog.id);

        return (
          <div key={dog.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={dog.img} alt={dog.name} className={styles.dogImage} />
              <span className={styles.ageBadge}>{dog.age}Y</span>
            </div>

            <div className={styles.cardHeader}>
              <h2 className={styles.name}>{dog.name}</h2>
              <div className={styles.zip}>{dog.zip_code}</div>
            </div>
            <p className={styles.breed}>{dog.breed}</p>

            <button
              onClick={() => toggleFavorite(dog.id)}
              className={`${styles.favButton} ${
                favoriteDogs.has(dog.id) ? styles.isFav : ""
              }`}
            >
              Favourite
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
