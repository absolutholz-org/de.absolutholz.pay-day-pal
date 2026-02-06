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
    <S.CardLabel isSelected={isSelected}>
      <VisuallyHidden
        as="input"
        // @ts-expect-error: Logic for ignoring the error (optional)
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
      />

      {isSelected && <S.CheckBadge>✓</S.CheckBadge>}

      <S.IconWrapper isSelected={isSelected} className="icon-animator">
        {icon}
      </S.IconWrapper>

      <S.CardText>{label}</S.CardText>
    </S.CardLabel>
  );
};

export const RadioCardGroup = ({
  label,
  options,
  selectedValue,
  onChange,
  name,
}: RadioCardGroupProps) => {
  return (
    <S.Section role="radiogroup" aria-labelledby={`${name}-label`}>
      <S.LabelTitle id={`${name}-label`}>{label}</S.LabelTitle>

      <S.Grid>
        {options.map((option) => (
          <RadioCard
            key={option.value}
            name={name}
            {...option}
            isSelected={selectedValue === option.value}
            onChange={onChange}
          />
        ))}
      </S.Grid>
    </S.Section>
  );
};
