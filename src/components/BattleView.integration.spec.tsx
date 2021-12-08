import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { QueryClientProvider, QueryClient } from 'react-query';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockRandomForEach } from 'jest-mock-random';
import { BattleView } from './BattleView';
import { mockPersonFromRequest } from 'src/utils/mocks';
import { BattleContextProvider } from './BattleContext';

const leftSidePersonId = 1;
const rightSidePersonId = 2;
const anotherPersonId = 3;

const renderBattleView = () => {
  const queryClient = new QueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <BattleContextProvider>
        <BattleView />
      </BattleContextProvider>
    </QueryClientProvider>
  );
};

describe('<BattleView />', () => {
  const mock = new MockAdapter(axios);
  mockRandomForEach([0.01, 0.02, 0.03]);

  beforeEach(() => {
    mock.reset();
  });

  it('Should load cards after pressing start battle button and find a winner of a battle', async () => {
    mock
      .onGet(`https://swapi.dev/api/people/${leftSidePersonId}`)
      .replyOnce(200, mockPersonFromRequest({ name: 'Left side person card' }))
      .onGet(`https://swapi.dev/api/people/${rightSidePersonId}`)
      .replyOnce(200, mockPersonFromRequest({ name: 'Right side person card', mass: '150' }));

    renderBattleView();

    const startBattleBtn = screen.getByRole('button', { name: 'Start Random Battle' });
    userEvent.click(startBattleBtn);

    await screen.findByText('Right side person card');
    const winningMessage = screen.getByText('Winner!');
    expect(winningMessage).toBeInTheDocument();
  });

  it('Should load cards after pressing start battle button and dont display winner because its draw', async () => {
    mock
      .onGet(`https://swapi.dev/api/people/${leftSidePersonId}`)
      .replyOnce(200, mockPersonFromRequest({ name: 'Left side person card' }))
      .onGet(`https://swapi.dev/api/people/${rightSidePersonId}`)
      .replyOnce(200, mockPersonFromRequest({ name: 'Right side person card' }));

    renderBattleView();

    const startBattleBtn = screen.getByRole('button', { name: 'Start Random Battle' });
    userEvent.click(startBattleBtn);

    await screen.findByText('Right side person card');
    const winningMessage = screen.queryByText('Winner!');
    expect(winningMessage).toBeNull();
  });

  it('Should change winning criteria, load cards and find the winner', async () => {
    mock
      .onGet(`https://swapi.dev/api/people/${leftSidePersonId}`)
      .replyOnce(200, mockPersonFromRequest({ name: 'Left side person card' }))
      .onGet(`https://swapi.dev/api/people/${rightSidePersonId}`)
      .replyOnce(200, mockPersonFromRequest({ name: 'Right side person card', height: '180' }));

    renderBattleView();

    const winningCriteriaSelectBox = screen.getByTestId('winningCriteria select box');
    fireEvent.change(winningCriteriaSelectBox, { target: { value: 'height' } });

    const startBattleBtn = screen.getByRole('button', { name: 'Start Random Battle' });
    userEvent.click(startBattleBtn);

    await screen.findByText('Right side person card');
    const winningMessage = screen.getByText('Winner!');
    expect(winningMessage).toBeInTheDocument();
  });

  it('Should load new opponent after clicking Fight again button on winner', async () => {
    mock
      .onGet(`https://swapi.dev/api/people/${leftSidePersonId}`)
      .replyOnce(200, mockPersonFromRequest({ name: 'Left side person card' }))
      .onGet(`https://swapi.dev/api/people/${rightSidePersonId}`)
      .replyOnce(200, mockPersonFromRequest({ name: 'Right side person card', mass: '150' }))
      .onGet(`https://swapi.dev/api/people/${anotherPersonId}`)
      .replyOnce(200, mockPersonFromRequest({ name: 'New opponent' }));

    renderBattleView();

    const startBattleBtn = screen.getByRole('button', { name: 'Start Random Battle' });
    userEvent.click(startBattleBtn);

    await screen.findByText('Right side person card');
    const fightAgainButton = screen.getByRole('button', { name: 'Fight again' });
    userEvent.click(fightAgainButton);

    const newOpponentLoaded = await screen.findByText('New opponent');
    expect(newOpponentLoaded).toBeInTheDocument();
  });
});
