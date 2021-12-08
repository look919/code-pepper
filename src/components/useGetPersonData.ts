import { useQuery } from 'react-query';
import axios from 'axios';
import { getSinglePersonCacheKeys } from '../utils/cache-keys';
import { Gender } from '../utils/enums';
import { PersonData } from '../utils/types';

interface GETPersonData {
  name: string;
  height: string;
  mass: string;
  gender: Gender;
  birth_year: string;
}

export const useGetPersonData = (personId: string) => {
  const { data, isLoading, isSuccess } = useQuery(
    getSinglePersonCacheKeys(personId),
    async () => {
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
    },
    {
      enabled: Boolean(personId)
    }
  );

  return { data, isLoading, isSuccess };
};
