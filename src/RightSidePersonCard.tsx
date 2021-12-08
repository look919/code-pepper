import React from 'react';
import { useBattleContext } from './BattleContext';
import { PersonCard } from './components/PersonCard';

export const RightSidePersonCard = () => {
  const { rightSidePerson, isDataLoading } = useBattleContext();

  return <PersonCard person={rightSidePerson.data} isLoading={isDataLoading} />;
};
