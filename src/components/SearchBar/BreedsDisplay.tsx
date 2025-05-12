import React from "react";
import styles from "./SearchBar.module.css";
import InlineModal from "../Modal/Modal";

interface BreedsDisplayProps {
  breeds: string[];
  selectedBreeds: Set<string>;
  toggleBreed: (breed: string) => void;
}

interface BreedSelectorModalProps {
  open: boolean;
  onClose: () => void;
  breeds: string[];
  selectedBreeds: Set<string>;
  toggleBreed: (breed: string) => void;
}

export const BreedsDisplay: React.FC<BreedsDisplayProps> = ({
  breeds,
  selectedBreeds,
  toggleBreed,
}) => (
  <div className={styles.breedsContainer}>
    {breeds.map((breed) => (
      <label key={breed} className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={selectedBreeds.has(breed)}
          onChange={() => toggleBreed(breed)}
        />
        <span>{breed}</span>
      </label>
    ))}
  </div>
);

export const BreedSelectorModal: React.FC<BreedSelectorModalProps> = ({
  open,
  onClose,
  breeds,
  selectedBreeds,
  toggleBreed,
}) => (
  <InlineModal
    backdropClosable
    modalOpen={open}
    title="Select Breeds"
    onClose={onClose}
  >
    <BreedsDisplay
      breeds={breeds}
      selectedBreeds={selectedBreeds}
      toggleBreed={toggleBreed}
    />
  </InlineModal>
);

export default BreedsDisplay;
