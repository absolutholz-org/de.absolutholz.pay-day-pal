import styled from "@emotion/styled";

export const FrostedGlassSection = styled.section`
  background-color: var(--section-bg);
  border: 1px solid var(--section-border);
  border-radius: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  padding: 1.5rem;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
`;

export const FrostedGlassSection_Headline = styled.h3`
  color: var(--text-sub);
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;
