import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    maxWidth: 600
  }
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Button variant='contained' color='primary'>
        Start Battle
      </Button>
    </div>
  );
}

export default App;
