import styles from "./Buttons.module.css";
import { IconButtonProps, PrimaryButtonProps } from "./types";

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  ...rest
}) => {
  return (
    <button className={styles.iconButton} {...rest}>
      <span className="material-icons">{iconName}</span>
    </button>
  );
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  fullWidth,
  large,
  style,
  children,
  ...rest
}) => {
  const computedStyle: React.CSSProperties = {
    ...style,
    width: fullWidth ? "100%" : undefined,
    padding: large ? "0.8rem 1rem" : undefined,
    paddingInline: fullWidth ? 0 : undefined,
  };

  return (
    <button className={styles.primaryButton} style={computedStyle} {...rest}>
      {children}
    </button>
  );
};
