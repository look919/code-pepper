import React from 'react';
import { QueryClientProvider, useQueryClient } from 'react-query';
import { BattleView } from './BattleView';

export const App = () => {
  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BattleView />
    </QueryClientProvider>
  );
};
