import type { ReactNode } from "react";

interface RadioOption {
  label: string;
  value: string;
  icon: ReactNode;
}

export interface RadioCardProps extends RadioOption {
  name: string;
  isSelected: boolean;
  onChange: (value: string) => void;
}

export interface RadioCardGroupProps {
  label: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  name: string;
}
