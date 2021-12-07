import React, { FC } from 'react';
import { Card, CardContent, CardMedia, Grid, GridSize, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Gender } from 'src/utils/enums';
import { useGetPersonData } from 'src/useGetPersonData';

export interface PersonData {
  name: string;
  height: string;
  mass: string;
  gender: Gender;
  birthYear: string;
}

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
              <PersonData type='Header' size={12}>
                {person.name}
              </PersonData>
              <PersonData type='Detail' size={6}>
                Birth year: {person.birthYear}
              </PersonData>
              <PersonData type='Detail' size={6}>
                Gender: {person.gender}
              </PersonData>
              <PersonData type='Detail' size={6}>
                Mass: {person.mass}
              </PersonData>
              <PersonData type='Detail' size={6}>
                Height: {person.height}
              </PersonData>
            </>
          ) : (
            <>
              <PersonData type='Skeleton' size={12} />
              <PersonData type='Skeleton' size={6} />
              <PersonData type='Skeleton' size={6} />
              <PersonData type='Skeleton' size={6} />
              <PersonData type='Skeleton' size={6} />
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

type PersonDataProps = PersonHeader | PersonDetail | SkeletonDetail;

const PersonData: FC<PersonDataProps> = props => {
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
