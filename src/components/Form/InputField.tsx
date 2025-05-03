import styles from "./InputField.module.css";

type ErrorProps = {
  name: string;
  msg?: string | null;
};

type InputFieldProps = {
  name: string;
  label: string;
  value: string;
  type?: string;
  error?: string | null;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const ErrorMessage = ({ msg, name }: ErrorProps) => {
  return (
    <div>
      <span id={`error-${name}`} role="alert" className={styles.error}>
        {msg || <> &nbsp;</>}
      </span>
    </div>
  );
};

export const InputLabel = (props: any) => {
  return (
    <label htmlFor={`input-${props.name}`} className={styles.inputLabel}>
      {props.children}
    </label>
  );
};

export const InputWrapper = (props: any) => {
  return <div className={styles.inputWrapper}>{props.children}</div>;
};

export const InputField = (props: InputFieldProps) => {
  const { type = "text", label, value, name, error, ...rest } = props;

  return (
    <InputWrapper>
      <InputLabel name={name}>{label}</InputLabel>
      <input
        id={`input-${name}`}
        type={type}
        name={name}
        className={styles.inputBox}
        aria-invalid={!!error}
        aria-describedby={error ? `error-${name}` : undefined}
        {...rest}
      />
      <ErrorMessage name={name} msg={error} />
    </InputWrapper>
  );
};

export default InputField;
