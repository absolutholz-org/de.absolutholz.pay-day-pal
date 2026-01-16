import { ReactNode } from "react";

export interface PageHeaderProps {
  title: string;
  slotLead?: ReactNode;
  slotMain?: ReactNode;
  slotTrail?: ReactNode;
}
