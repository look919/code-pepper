import { Gender } from './enums';

export interface PersonData {
  name: string;
  height: string;
  mass: string;
  gender: Gender;
  birthYear: string;
}

export interface GETPersonData {
  name: string;
  height: string;
  mass: string;
  gender: Gender;
  birth_year: string;
}
