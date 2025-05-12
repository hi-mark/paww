import { PrimaryButton } from "../Buttons/Buttons";
import styles from "./GenerateMatch.module.css";

export const MatchedDogDisplay = (props: any) => {
  const { loading, error, data } = props;

  if (loading) return <p>Loading</p>;
  if (error) return <p>error</p>;

  return (
    <div className={styles.matchWrapper}>
      <div className={styles.contentWrapper}>
        <h3 className={styles.ctaHeader}>
          <b>{data.name}</b> would <br />
          love you!
        </h3>
        <p className={styles.ctaText}>
          Your selected favorites will be used to help find the perfect furry
          companion for your home.
        </p>

        <PrimaryButton
          onClick={() => {
            window.open("https://www.koharmunish.com/contact", "_blank");
          }}
        >
          Proceed to Next Step
        </PrimaryButton>
      </div>
      <img src={data.img} alt={data.name} className={styles.dataImage} />
    </div>
  );
};

export default MatchedDogDisplay;
