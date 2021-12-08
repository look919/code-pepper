import React from 'react';
import { PersonCard } from './reusable';
import { useBattleContext } from './BattleContext';
import { useGetWinningSide } from './useGetWinningSide';
import { BattleResult } from 'src/utils/enums';
import { getRandomPersonId } from 'src/utils/getRandomPersonId';

export const RightSidePersonCard = () => {
  const { rightSidePerson, isDataLoading, setLeftSidePersonId: setOpponentId } = useBattleContext();
  const { getWinningSide } = useGetWinningSide();

  const battleResult = getWinningSide();
  const isWinner = battleResult === BattleResult.rightSideWon;

  const handleFightAgain = () => {
    setOpponentId(getRandomPersonId());
  };

  return (
    <PersonCard
      person={rightSidePerson.data}
      onFightAgain={handleFightAgain}
      status={isWinner ? 'won' : 'drewOrLost'}
      isLoading={isDataLoading}
    />
  );
};
