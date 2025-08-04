import { getCountryByCode } from 'utils.ts';

export const getMatchCountry = (code: string) => {
  const country = getCountryByCode(code);
  if (!country) {
    return null;
  }

  return `${country.emoji} ${country.name}`;
};
