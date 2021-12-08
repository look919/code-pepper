import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { UseQueryResult } from 'react-query';
import { useGetPersonData } from './useGetPersonData';
import { PersonData } from '../utils/types';

type CustomSetStateAction<T> = Dispatch<SetStateAction<T>>;
type UseQueryPersonResult = Pick<UseQueryResult<PersonData, unknown>, 'data' | 'isSuccess' | 'isLoading'>;
type WinningCriteria = 'mass' | 'height';

interface ContextValues {
  winningCriteria: WinningCriteria;
  setWinningCriteria: CustomSetStateAction<WinningCriteria>;
  leftSidePersonId: string;
  rightSidePersonId: string;
  setLeftSidePersonId: CustomSetStateAction<string>;
  setRightSidePersonId: CustomSetStateAction<string>;
  leftSidePerson: UseQueryPersonResult;
  rightSidePerson: UseQueryPersonResult;
  isDataLoading: boolean;
}

const BattleContext = React.createContext<ContextValues | undefined>(undefined);

const BattleContextProvider: FC = ({ children }) => {
  const [winningCriteria, setWinningCriteria] = useState<WinningCriteria>('mass');
  const [leftSidePersonId, setLeftSidePersonId] = useState<string>(null);
  const leftSidePerson = useGetPersonData(leftSidePersonId);
  const [rightSidePersonId, setRightSidePersonId] = useState<string>(null);
  const rightSidePerson = useGetPersonData(rightSidePersonId);

  const isDataLoading = leftSidePerson.isLoading || rightSidePerson.isLoading || !leftSidePerson.data || !rightSidePerson.data;

  const value = {
    winningCriteria,
    setWinningCriteria,
    leftSidePersonId,
    rightSidePersonId,
    setLeftSidePersonId,
    setRightSidePersonId,
    leftSidePerson,
    rightSidePerson,
    isDataLoading
  };

  return <BattleContext.Provider value={value}>{children}</BattleContext.Provider>;
};

function useBattleContext() {
  const context = React.useContext(BattleContext);
  if (context === undefined) {
    throw new Error('useBattleContext must be used within a BattleContext');
  }
  return context;
}

export { BattleContextProvider, useBattleContext };
