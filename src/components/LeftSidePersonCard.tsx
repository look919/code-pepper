import React from 'react';
import { useBattleContext } from './BattleContext';
import { PersonCard } from './reusable';

export const LeftSidePersonCard = () => {
  const { leftSidePerson, isDataLoading } = useBattleContext();

  return <PersonCard person={leftSidePerson.data} isLoading={isDataLoading} />;
};
