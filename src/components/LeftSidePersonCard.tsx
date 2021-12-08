import React from 'react';
import { useBattleContext } from './BattleContext';
import { PersonCard } from './reusable';
import { useGetWinningSide } from './useGetWinningSide';
import { BattleResult } from 'src/utils/enums';

export const LeftSidePersonCard = () => {
  const { leftSidePerson, isDataLoading } = useBattleContext();
  const { getWinningSide } = useGetWinningSide();

  const battleResult = getWinningSide();
  const isWinner = battleResult === BattleResult.leftSideWon;

  return <PersonCard person={leftSidePerson.data} status={isWinner ? 'won' : 'drewOrLost'} isLoading={isDataLoading} />;
};
