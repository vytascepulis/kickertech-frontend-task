import PremierLeague from 'containers/PremierLeague';
import EuroBasket from 'containers/EuroBasket';
import Wimbledon from 'containers/Wimbledon';

function App() {
  return (
    <div className='mt-3 flex w-full flex-wrap items-start justify-center gap-3 p-3 sm:mt-[30px] sm:gap-[40px]'>
      <PremierLeague />
      <EuroBasket />
      <Wimbledon />
    </div>
  );
}

export default App;
