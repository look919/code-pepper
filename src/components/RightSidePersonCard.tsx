import React from 'react';
import { useBattleContext } from './BattleContext';
import { PersonCard } from './reusable';

export const RightSidePersonCard = () => {
  const { rightSidePerson, isDataLoading } = useBattleContext();

  return <PersonCard person={rightSidePerson.data} isLoading={isDataLoading} />;
};
