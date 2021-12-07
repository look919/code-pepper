import React, { useState } from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Button } from './components';
import { PersonCard } from './components/PersonCard';
import { Gender } from './utils/enums';
import { getRandomPersonId } from './utils/getRandomPersonId';
import { useGetPersonData } from './useGetPersonData';

const randomPersonData = {
  name: 'Test name',
  height: '212',
  mass: '321',
  gender: Gender.male,
  birthYear: '3212'
};

const useStyles = makeStyles({
  container: {
    maxWidth: 1200
  },
  versusText: {
    marginTop: '-3rem'
  }
});

export const BattleView = () => {
  const classes = useStyles();
  const [leftSidePersonId, setLeftSidePersonId] = useState<string>(null);
  const leftSidePerson = useGetPersonData(leftSidePersonId);
  const [rightSidePersonId, setRightSidePersonId] = useState<string>(null);
  const rightSidePerson = useGetPersonData(rightSidePersonId);

  const handleStartRandomBattle = () => {
    setLeftSidePersonId(getRandomPersonId());
    setRightSidePersonId(getRandomPersonId());
  };

  const isDataLoading = leftSidePerson.isLoading || rightSidePerson.isLoading || !leftSidePerson.data || !rightSidePerson.data;

  return (
    <div className={classes.container}>
      <Grid container spacing={2} alignItems='center' justifyContent='center'>
        <Grid item xs={12}>
          <Button onClick={handleStartRandomBattle}>Start Random Battle</Button>
        </Grid>
        <Grid item xs={5}>
          <PersonCard person={leftSidePerson.data} isLoading={isDataLoading} />
        </Grid>
        <Grid item xs={2}>
          <Typography variant='h2' color='secondary' align='center' className={classes.versusText}>
            VS
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <PersonCard person={rightSidePerson.data} isLoading={isDataLoading} />
        </Grid>
      </Grid>
    </div>
  );
};
