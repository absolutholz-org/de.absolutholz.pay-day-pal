import { useEffect, useState } from "react";
import { VisuallyHidden } from "../VisuallyHidden";
import * as S from "./_RadioCardGroup.styles";
import type {
  RadioCardGroupProps,
  RadioCardProps,
} from "./_RadioCardGroup.types";

const RadioCard = ({
  label,
  value,
  icon,
  isSelected,
  onChange,
  name,
}: RadioCardProps) => {
  return (
    <>
      <S.CardLabel isSelected={isSelected} htmlFor={`${name}-${value}`}>
        <VisuallyHidden
          id={`${name}-${value}`}
          as="input"
          // @ts-expect-error: Logic for ignoring the error (optional)
          type="radio"
          name={name}
          value={value}
          checked={isSelected}
          onChange={() => onChange(value)}
        />
        <S.CheckBadge>✓</S.CheckBadge>

        <S.IconWrapper isSelected={isSelected} className="icon-animator">
          {icon}
        </S.IconWrapper>

        <S.CardText>{label}</S.CardText>
      </S.CardLabel>
    </>
  );
};

export const RadioCardGroup = ({
  options,
  initialValue,
  onChange,
  name,
}: RadioCardGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(initialValue);

  useEffect(() => {
    onChange(selectedValue);
  }, [selectedValue, onChange]);

  return (
    <S.Grid>
      {options.map((option) => (
        <RadioCard
          key={option.value}
          name={name}
          {...option}
          isSelected={selectedValue === option.value}
          onChange={setSelectedValue}
        />
      ))}
    </S.Grid>
  );
};
