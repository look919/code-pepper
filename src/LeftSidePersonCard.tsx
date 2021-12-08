import React from 'react';
import { useBattleContext } from './BattleContext';
import { PersonCard } from './components/PersonCard';

export const LeftSidePersonCard = () => {
  const { leftSidePerson, isDataLoading } = useBattleContext();

  return <PersonCard person={leftSidePerson.data} isLoading={isDataLoading} />;
};
