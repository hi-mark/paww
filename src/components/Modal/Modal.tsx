import React from "react";
import { IconButton } from "../Buttons/Buttons";
import styles from "./Modal.module.css";

/**
 * Note:
 * While I typically use React Portal for modals to ensure better accessibility
 * and layering control, I've opted for a simpler inline modal here to keep it
 * simple for this assessment.
 */

interface InlineModalProps {
  modalOpen: boolean;
  title: string;
  onClose: () => void;
  backdropClosable?: boolean;
  children: React.ReactNode;
}

export const InlineModal: React.FC<InlineModalProps> = ({
  modalOpen,
  title,
  onClose,
  backdropClosable = false,
  children,
}) => {
  if (!modalOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={backdropClosable ? onClose : undefined}
      role="presentation"
      aria-hidden="true"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeading}>
          <h3>{title}</h3>
          <IconButton
            aria-label="close modal"
            onClick={onClose}
            iconName="close"
          />
        </div>
        <div className={styles.modalArea}>{children}</div>
      </div>
    </div>
  );
};

export default InlineModal;
