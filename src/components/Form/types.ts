import { ReactNode } from "react";

export type ErrorProps = {
  name: string;
  msg?: string | null;
};

export type LabelledInputProps = {
  name: string;
  label: string;
  type?: string;
  error?: string | null;
  placeholder?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type InputLabelProps = {
  name: string;
  children: ReactNode;
};

export type InputWrapperProps = {
  children: ReactNode;
};

export type InputFieldProps = {
  name: string;
  type?: string;
  error?: string | null;
} & React.InputHTMLAttributes<HTMLInputElement>;
