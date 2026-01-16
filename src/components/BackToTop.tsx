import { ArrowUp } from "lucide-react";

export interface BackToTopProps {
  label?: string;
}

export const BackToTop = ({ label = "Back to top" }: BackToTopProps) => {
  return (
    <div className="back-to-top-wrapper">
      <a href="#top" className="back-to-top" aria-label={label}>
        <ArrowUp size={24} />
      </a>
    </div>
  );
};
