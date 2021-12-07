import { useQuery } from 'react-query';
import axios from 'axios';
import { getSinglePersonCacheKeys } from './utils/cache-keys';
import { Gender } from './utils/enums';
import { PersonData } from './components/PersonCard';

interface GETPersonData {
  name: string;
  height: string;
  mass: string;
  gender: Gender;
  birth_year: string;
}

export const useGetPersonData = (personId: string) => {
  const { data, isLoading } = useQuery(getSinglePersonCacheKeys(personId), async () => {
    const {
      data: { name, height, mass, gender, birth_year }
    } = await axios.get<GETPersonData>(`https://swapi.dev/api/people/${personId}`);

    const person: PersonData = {
      name,
      height,
      mass,
      gender,
      birthYear: birth_year
    };

    return person;
  });

  return { data, isLoading };
};
