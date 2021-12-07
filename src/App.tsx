import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import { Button } from './components';
import { PersonCard } from './components/PersonCard';
import { Gender } from './utils/enums';

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

export const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container spacing={2} alignItems='center' justifyContent='center'>
        <Grid item xs={12}>
          <Button>Start Battle</Button>
        </Grid>
        <Grid item xs={5}>
          <PersonCard person={randomPersonData} />
        </Grid>
        <Grid item xs={2}>
          <Typography variant='h2' color='secondary' align='center' className={classes.versusText}>
            VS
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <PersonCard person={randomPersonData} />
        </Grid>
      </Grid>
    </div>
  );
};
