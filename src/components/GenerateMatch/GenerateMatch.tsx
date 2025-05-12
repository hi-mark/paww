import { useState } from "react";
import styles from "./GenerateMatch.module.css";
import InlineModal from "../Modal/Modal";
import MatchedDogDisplay from "./MatchedDogDisplay";
import { fetchMatchedDog } from "./helper";
import { PrimaryButton } from "../Buttons/Buttons";

export const GenerateMatch = (props: any) => {
  const { favorites } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<any>();

  const handleMatch = async () => {
    if (!favorites || favorites.size === 0) {
      window.alert("Please select atleast one favorite before matching");
      return;
    }

    setLoading(true);
    setModalOpen(true);
    const matchedDog = await fetchMatchedDog(favorites);
    if (!matchedDog) {
      setError("Something Went wrong, unable to Match Dog :/");
      return;
    }
    setData(matchedDog);
    setLoading(false);
  };

  const handleClose = () => {
    setError("");
    setData(null);
    setModalOpen(false);
  };

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.cta}>
          <div className={styles.contentWrapper}>
            <h3 className={styles.ctaHeader}>
              Ready to take
              <br /> home cufie woofie
            </h3>
            <p className={styles.ctaText}>
              Your selected favorites will be used to help find the perfect
              furry companion for your home.
            </p>
            <PrimaryButton onClick={handleMatch}>Generate Match</PrimaryButton>
          </div>
          <img src="/images/ctaImage.png" className={styles.ctaImage} />
        </div>
        <InlineModal
          title="Your Paww Partner"
          modalOpen={modalOpen}
          onClose={handleClose}
        >
          <MatchedDogDisplay loading={loading} error={error} data={data} />
        </InlineModal>
      </div>
    </section>
  );
};

export default GenerateMatch;
