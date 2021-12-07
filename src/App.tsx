import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BattleView } from './BattleView';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BattleView />
    </QueryClientProvider>
  );
};
