import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Button } from './reusable';
import { useBattleContext } from './BattleContext';
import { LeftSidePersonCard } from './LeftSidePersonCard';
import { RightSidePersonCard } from './RightSidePersonCard';
import { getRandomPersonId } from '../utils/getRandomPersonId';

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
  const { setLeftSidePersonId, setRightSidePersonId } = useBattleContext();

  const handleStartRandomBattle = () => {
    setLeftSidePersonId(getRandomPersonId());
    setRightSidePersonId(getRandomPersonId());
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={2} alignItems='center' justifyContent='center'>
        <Grid item xs={12}>
          <Button onClick={handleStartRandomBattle}>Start Random Battle</Button>
        </Grid>
        <Grid item xs={5}>
          <LeftSidePersonCard />
        </Grid>
        <Grid item xs={2}>
          <Typography variant='h2' color='secondary' align='center' className={classes.versusText}>
            VS
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <RightSidePersonCard />
        </Grid>
      </Grid>
    </div>
  );
};
