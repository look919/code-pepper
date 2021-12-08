import React, { FC } from 'react';
import { Card, CardContent, CardMedia, Grid, GridSize, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { PersonData } from 'src/utils/types';

interface PersonCardProps {
  person: PersonData;
  isLoading: boolean;
}

// I usually destructure up to two proporties, otherwise I do that inside of the component.
// I know that people have different opinion about how to approach destructure props properly :)
export const PersonCard = ({ person, isLoading }: PersonCardProps) => {
  return (
    <Card>
      <CardMedia component='img' height='140' image='/static/star-wars.jpg' alt='Default star wars photo' />
      <CardContent>
        <Grid container spacing={1}>
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
      <Grid item xs={size}>
        <Skeleton width={140} height={25} />
      </Grid>
    );
  }

  return (
    <Grid item xs={size}>
      <Typography variant={type === 'Header' ? 'body1' : 'body2'}>{children}</Typography>
    </Grid>
  );
};
