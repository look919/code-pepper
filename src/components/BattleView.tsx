import React from 'react';
import { Box, Grid, TextField, Typography, makeStyles, MenuItem } from '@material-ui/core';
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
  const { winningCriteria, setWinningCriteria, setLeftSidePersonId, setRightSidePersonId } = useBattleContext();

  const handleStartRandomBattle = () => {
    setLeftSidePersonId(getRandomPersonId());
    setRightSidePersonId(getRandomPersonId());
  };

  const handleChangeWinningCriteria = e => {
    console.log(e.target.value);
    setWinningCriteria(e.target.value);
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={2} alignItems='center' justifyContent='center'>
        <Grid item xs={12}>
          <Box display='flex' justifyContent='space-between'>
            <Button onClick={handleStartRandomBattle}>Start Random Battle</Button>
            <TextField select value={winningCriteria} onChange={handleChangeWinningCriteria} helperText='Please select winning criteria'>
              <MenuItem value={'mass'}>Mass</MenuItem>
              <MenuItem value={'height'}>Height</MenuItem>
            </TextField>
          </Box>
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
