import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BattleContextProvider } from './components/BattleContext';
import { BattleView } from './components/BattleView';

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <BattleContextProvider>
      <BattleView />
    </BattleContextProvider>
  </QueryClientProvider>
);
