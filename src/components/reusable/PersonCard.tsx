import React, { FC } from 'react';
import { Card, CardContent, CardMedia, Grid, GridSize, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { PersonData } from 'src/utils/types';
import { Button } from '.';

type CardBattleStatus = 'won' | 'drewOrLost';

interface PersonCardProps {
  person: PersonData;
  onFightAgain: () => void;
  status: CardBattleStatus;
  isLoading: boolean;
}

const useStyles = makeStyles({
  hiddenLoser: {
    opacity: 0.6
  }
});

// I usually destructure up to two proporties, otherwise I do that inside of the component.
// I wanted to clarify that because I know that people have different opinion about how to approach destructure props properly :)
export const PersonCard = (props: PersonCardProps) => {
  const { person, onFightAgain, status, isLoading } = props;
  const classes = useStyles();

  return (
    <Card className={status === 'drewOrLost' ? classes.hiddenLoser : null}>
      <CardMedia component='img' height='140' image='/static/star-wars.jpg' alt='Default star wars photo' />
      <CardContent>
        <Grid container spacing={2}>
          {!isLoading ? (
            <>
              <PersonSingleInfo type='Header' size={12}>
                {person.name}
              </PersonSingleInfo>
              <PersonSingleInfo type='Detail' size={6}>
                Birth year: {person.birthYear}
              </PersonSingleInfo>
              <PersonSingleInfo type='Detail' size={6}>
                Gender: {person.gender}
              </PersonSingleInfo>
              <PersonSingleInfo type='Detail' size={6}>
                Mass: {person.mass}
              </PersonSingleInfo>
              <PersonSingleInfo type='Detail' size={6}>
                Height: {person.height}
              </PersonSingleInfo>
              {status === 'won' && (
                <>
                  <PersonSingleInfo type='Header' size={6}>
                    Winner!
                  </PersonSingleInfo>

                  <Grid item xs={6}>
                    <Button onClick={onFightAgain}>Fight again</Button>
                  </Grid>
                </>
              )}
            </>
          ) : (
            <>
              <PersonSingleInfo type='Skeleton' size={12} />
              <PersonSingleInfo type='Skeleton' size={6} />
              <PersonSingleInfo type='Skeleton' size={6} />
              <PersonSingleInfo type='Skeleton' size={6} />
              <PersonSingleInfo type='Skeleton' size={6} />
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

// That's a little bit overkill in this example but wanted to show some fancy tricks, if I am given a chance ;)
interface PersonHeader {
  type: 'Header';
  size: GridSize;
}
interface PersonDetail {
  type: 'Detail';
  size: GridSize;
}
interface SkeletonDetail {
  type: 'Skeleton';
  size: GridSize;
}

type PersonSingleInfoProps = PersonHeader | PersonDetail | SkeletonDetail;

const PersonSingleInfo: FC<PersonSingleInfoProps> = props => {
  const { type, size, children } = props;

  if (type === 'Skeleton') {
    return (
      <Grid item xs={size} data-testid='personcard-skeleton'>
        <Skeleton width={140} height={25} />
      </Grid>
    );
  }

  return (
    <Grid item xs={size}>
      <Typography variant={type === 'Header' ? 'h5' : 'body2'}>{children}</Typography>
    </Grid>
  );
};
