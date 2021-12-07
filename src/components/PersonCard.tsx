import React, { FC } from 'react';
import { Card, CardContent, CardMedia, Grid, GridSize, Typography } from '@material-ui/core';
import { Gender } from 'src/utils/enums';

export interface PersonData {
  name: string;
  height: string;
  mass: string;
  gender: Gender;
  birthYear: string;
}

interface PersonCardProps {
  person: PersonData;
}

// I usually destructure up to two proporties, otherwise I do that inside of the component.
// I know that people have different opinion about how to approach destructure props properly :)
export const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <Card>
      <CardMedia component='img' height='140' image='/static/star-wars.jpg' alt='Default star wars photo' />
      <CardContent>
        <Grid container spacing={1}>
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

type PersonDataProps = PersonHeader | PersonDetail;

const PersonData: FC<PersonDataProps> = props => {
  const { type, size, children } = props;

  return (
    <Grid item xs={size}>
      <Typography variant={type === 'Header' ? 'body1' : 'body2'}>{children}</Typography>
    </Grid>
  );
};
