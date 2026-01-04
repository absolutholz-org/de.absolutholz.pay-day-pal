import React from 'react';
import { Bed, Shirt, Utensils, Sparkles, Sofa, Box, Minus } from 'lucide-react';
import { ChoreButtonProps } from './ChoreButton.types';
import {
  ChoreCard,
  ChoreMain,
  ChoreIconWrapper,
  ChoreInfo,
  ChoreName,
  ChoreValue,
  ChoreCount,
  DecrementButton,
  CountBadge,
} from './ChoreButton.styles';

const categoryIconMap: { [key: string]: React.ElementType } = {
  bedroom: Bed,
  laundry: Shirt,
  kitchen: Utensils,
  'living-room': Sofa,
  bathroom: Sparkles,
  outside: Box,
};

export function ChoreButton({
  chore,
  count,
  onIncrement,
  onDecrement,
}: ChoreButtonProps) {
  const Icon = categoryIconMap[chore.category] || Box;

  return (
    <ChoreCard active={count > 0} onClick={onIncrement}>
      <ChoreMain>
        <ChoreIconWrapper>
          <Icon size={24} />
        </ChoreIconWrapper>
        <ChoreInfo>
          <ChoreName>{chore.labels?.en}</ChoreName>
          <ChoreValue>
            €{chore.value} · {chore.frequency} · {chore.effort} Effort
          </ChoreValue>
        </ChoreInfo>
      </ChoreMain>
      <ChoreCount>
        {count > 0 && (
          <>
            <DecrementButton
              onClick={(e) => {
                e.stopPropagation();
                onDecrement();
              }}
            >
              <Minus size={16} strokeWidth={3} />
            </DecrementButton>
            <CountBadge>{count}</CountBadge>
          </>
        )}
      </ChoreCount>
    </ChoreCard>
  );
}
