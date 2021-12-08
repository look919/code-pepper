import React from 'react';
import { useBattleContext } from './BattleContext';
import { PersonCard } from './reusable';
import { useGetWinningSide } from './useGetWinningSide';
import { BattleResult } from 'src/utils/enums';
import { getRandomPersonId } from 'src/utils/getRandomPersonId';

export const LeftSidePersonCard = () => {
  const { leftSidePerson, isDataLoading, setRightSidePersonId: setOpponentId } = useBattleContext();
  const { getWinningSide } = useGetWinningSide();

  const battleResult = getWinningSide();
  const isWinner = battleResult === BattleResult.leftSideWon;

  const handleFightAgain = () => {
    setOpponentId(getRandomPersonId());
  };

  return (
    <PersonCard
      person={leftSidePerson.data}
      onFightAgain={handleFightAgain}
      status={isWinner ? 'won' : 'drewOrLost'}
      isLoading={isDataLoading}
    />
  );
};
