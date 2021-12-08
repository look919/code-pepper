import React from 'react';
import { PersonCard } from './reusable';
import { useBattleContext } from './BattleContext';
import { useGetWinningSide } from './useGetWinningSide';
import { BattleResult } from 'src/utils/enums';

export const RightSidePersonCard = () => {
  const { rightSidePerson, isDataLoading } = useBattleContext();
  const { getWinningSide } = useGetWinningSide();

  const battleResult = getWinningSide();
  const isWinner = battleResult === BattleResult.rightSideWon;

  return <PersonCard person={rightSidePerson.data} status={isWinner ? 'won' : 'drewOrLost'} isLoading={isDataLoading} />;
};
