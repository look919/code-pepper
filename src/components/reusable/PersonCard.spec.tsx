import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockPerson } from '../../utils/mocks';
import { PersonCard } from '.';

describe('<PersonCard />', () => {
  it('Should load skeletons if data is not loaded yet', () => {
    render(<PersonCard person={null} onFightAgain={() => {}} status={'drewOrLost'} isLoading={true} />);

    const skeletons = screen.getAllByTestId('personcard-skeleton');

    expect(skeletons).toHaveLength(5);
  });

  it('Should render card correctly with data loaded', () => {
    render(<PersonCard person={mockPerson()} onFightAgain={() => {}} status={'drewOrLost'} isLoading={false} />);

    const personName = screen.getByText('Test name');
    const personBirthYear = screen.getByText('1925', { exact: false });

    expect(personName).toBeInTheDocument();
    expect(personBirthYear).toBeInTheDocument();
  });

  it('Should render winning information and button to fight again if card has won its battle', () => {
    render(<PersonCard person={mockPerson()} onFightAgain={() => {}} status={'won'} isLoading={false} />);

    const winningMessage = screen.getByText('Winner!');
    const fightAgainButton = screen.getByRole('button', { name: 'Fight again' });

    expect(winningMessage).toBeInTheDocument();
    expect(fightAgainButton).toBeInTheDocument();
  });
});
