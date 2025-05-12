import styles from "./InputField.module.css";
import {
  ErrorProps,
  InputFieldProps,
  InputLabelProps,
  InputWrapperProps,
  LabelledInputProps,
} from "./types";

export const InputWrapper = (props: InputWrapperProps) => {
  return <div className={styles.inputWrapper}>{props.children}</div>;
};

export const ErrorMessage = ({ msg, name }: ErrorProps) => {
  return (
    <div>
      <span id={`error-${name}`} role="alert" className={styles.error}>
        {msg || <> &nbsp;</>}
      </span>
    </div>
  );
};

export const InputLabel = (props: InputLabelProps) => {
  return (
    <label htmlFor={`input-${props.name}`} className={styles.inputLabel}>
      {props.children}
    </label>
  );
};

export const InputField: React.FC<InputFieldProps> = ({
  name,
  type = "text",
  error,
  ...rest
}) => {
  return (
    <input
      id={`input-${name}`}
      type={type}
      name={name}
      className={styles.inputBox}
      aria-invalid={!!error}
      aria-describedby={error ? `error-${name}` : undefined}
      {...rest}
    />
  );
};

export const LabelledInput = (props: LabelledInputProps) => {
  const { type = "text", label, name, error, ...rest } = props;

  return (
    <InputWrapper>
      <InputLabel name={name}>{label}</InputLabel>
      <InputField type={type} name={name} error={error} {...rest} />
      <ErrorMessage name={name} msg={error} />
    </InputWrapper>
  );
};

export default LabelledInput;
