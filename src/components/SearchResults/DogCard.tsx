import { Dog } from "@/hooks/useFetchDogData";
import styles from "./SearchResults.module.css";

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
}

export const DogCard: React.FC<DogCardProps> = ({
  dog,
  isFavorite,
  toggleFavorite,
}) => {
  return (
    <div className={styles.card}>
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
        className={`${styles.favButton} ${isFavorite ? styles.isFav : ""}`}
      >
        Favourite
      </button>
    </div>
  );
};
