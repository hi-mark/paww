import { useState } from "react";
import { InputField } from "../Form/InputField";
import styles from "./SearchResults.module.css";

export const keepValueInBound = (val: string) => {
  let value = parseInt(val, 10);

  if (isNaN(value)) return; // guard for invalid input

  if (value > 100) {
    value = 100;
  } else if (value < 3) {
    value = 3;
  }

  return value;
};

const Pagination = (props: any) => {
  const {
    currentPage,
    setFieldsPerPage,
    setCurrentPage,
    fieldsPerPage,
    total,
  } = props;

  const totalPages = Math.ceil(total / fieldsPerPage);
  const goToNextPage = () => {
    setCurrentPage((prev: number) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev: number) => Math.max(prev - 1, 1));
  };

  const [value, setValue] = useState(fieldsPerPage);

  return (
    <>
      <div className={styles.paginationWrapper}>
        <button
          className={styles.sortButton}
          disabled={currentPage <= 1}
          onClick={goToPreviousPage}
        >
          Prev
        </button>
        {currentPage}/{totalPages}
        <button className={styles.sortButton} onClick={goToNextPage}>
          Next
        </button>
      </div>

      <div className={styles.paginationWrapper}>
        Items per Page:
        <InputField
          name="Items Per Page"
          type="number"
          value={value}
          onChange={(e) => {
            setValue(e?.target?.value);
          }}
          onBlur={() => {
            setValue(keepValueInBound(value));
            setCurrentPage(1);
            setFieldsPerPage(keepValueInBound(value));
          }}
          style={{ maxWidth: "90px" }}
        />
      </div>
    </>
  );
};

export default Pagination;
