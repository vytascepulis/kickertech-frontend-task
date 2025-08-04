import type { Match } from 'types.ts';
import { getMatchCountry } from 'containers/EuroBasket/utils.ts';

interface Props {
  matches: Match[];
}

const Matches = ({ matches }: Props) => {
  if (!matches.length) return null;

  return (
    <ul className='mb-5 max-h-[300px] divide-y divide-black/40 overflow-y-scroll p-3 text-white'>
      {[...matches].reverse().map((match) => (
        <li
          key={`${match.participantA.id}-${match.participantB.id}`}
          className='flex flex-row justify-between gap-3 py-3'
        >
          <span className='flex flex-row gap-2'>
            {getMatchCountry(match.participantA.name)}
            <span className='font-bold text-orange-500'>vs</span>
            {getMatchCountry(match.participantB.name)}
          </span>
          <span className='font-bold'>
            {match.participantA.score}-{match.participantB.score}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Matches;
