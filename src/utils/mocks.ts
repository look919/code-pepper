import { Gender } from './enums';
import { GETPersonData, PersonData } from './types';

export const mockPerson = (override?: Partial<PersonData>): PersonData => ({
  name: 'Test name',
  height: '190',
  mass: '130',
  gender: Gender.female,
  birthYear: '1925',
  ...override
});

export const mockPersonFromRequest = (override?: Partial<GETPersonData>): GETPersonData => ({
  name: 'Test name',
  height: '190',
  mass: '123',
  gender: Gender.female,
  birth_year: '1925',
  ...override
});
