import PremierLeague from 'containers/PremierLeague';
import EuroBasket from 'containers/EuroBasket';

function App() {
  return (
    <div className='mt-[150px] flex h-screen flex-wrap items-start justify-center gap-[30px]'>
      <PremierLeague />
      <EuroBasket />
    </div>
  );
}

export default App;
