import * as S from "./_Card.styles";
import { CardProps } from "./_Card.types";

export function Card({ children }: CardProps) {
  return <S.Card>{children}</S.Card>;
}
