export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconName: string;
}

export interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  large?: boolean;
}
