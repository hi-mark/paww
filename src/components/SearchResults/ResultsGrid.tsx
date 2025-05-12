import { Dog } from "@/hooks/useFetchDogData";
import styles from "./SearchResults.module.css";
import { DogCard } from "./DogCard";

interface ResultsGridProps {
  loading: boolean;
  error: boolean;
  data: Dog[];
  favoriteDogs: Set<string>;
  toggleFavorite: (id: string) => void;
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({
  loading,
  error,
  data,
  toggleFavorite,
  favoriteDogs,
}) => {
  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>Something went wrong</p>;

  return (
    <div className={styles.cardsWrapper}>
      {data.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          isFavorite={favoriteDogs.has(dog.id)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};

export default ResultsGrid;
