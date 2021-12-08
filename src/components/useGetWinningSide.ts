import { BattleResult } from 'src/utils/enums';
import { useBattleContext } from './BattleContext';

export const useGetWinningSide = () => {
  const { winningCriteria, leftSidePerson, rightSidePerson } = useBattleContext();

  const getWinningSide = (): BattleResult => {
    if (!leftSidePerson.data || !rightSidePerson.data) return undefined;

    const { data: leftSidePersonData } = leftSidePerson;
    const { data: rightSidePersonData } = rightSidePerson;
    const leftSidePersonStrength = leftSidePersonData[winningCriteria];
    const rightSidePersonStrength = rightSidePersonData[winningCriteria];

    const sameResult = leftSidePersonStrength === rightSidePersonStrength;
    const isDraw = sameResult || leftSidePersonStrength === 'unknown' || rightSidePersonStrength === 'unknown';
    if (isDraw) return BattleResult.draw;

    const isLeftSideWInning = parseInt(leftSidePersonStrength) > parseInt(rightSidePersonStrength);

    return isLeftSideWInning ? BattleResult.leftSideWon : BattleResult.rightSideWon;
  };

  return { getWinningSide };
};
