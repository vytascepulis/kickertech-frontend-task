import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import { PremierLeagueProvider } from 'contexts/PremierLeagueContext';
import AddTeam from 'containers/PremierLeague/AddTeam.tsx';
import AddScore from 'containers/PremierLeague/AddScore.tsx';
import ScoreTable from 'containers/PremierLeague/ScoreTable.tsx';

const PremierLeague = () => {
  return (
    <PremierLeagueProvider>
      <div className='max-w-[400px] overflow-hidden rounded-xl border border-neutral-200 shadow-lg'>
        <div className='bg-[#37003c] p-4 text-2xl font-semibold text-white'>
          Premier League
        </div>
        <div className='p-4'>
          <AddTeam />
          <AddScore />
          <ScoreTable />
        </div>
      </div>
    </PremierLeagueProvider>
  );
};

export default PremierLeague;
