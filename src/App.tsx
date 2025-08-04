import PremierLeague from 'containers/PremierLeague';
import EuroBasket from 'containers/EuroBasket';

function App() {
  return (
    <div className='flex justify-center'>
      <div className='mt-[30px] grid gap-[30px] md:mt-[150px] md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(250px,450px))]'>
        <PremierLeague />
        <EuroBasket />
      </div>
    </div>
  );
}

export default App;
