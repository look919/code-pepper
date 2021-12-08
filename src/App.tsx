import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BattleContextProvider } from './BattleContext';
import { BattleView } from './BattleView';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BattleContextProvider>
        <BattleView />
      </BattleContextProvider>
    </QueryClientProvider>
  );
};
