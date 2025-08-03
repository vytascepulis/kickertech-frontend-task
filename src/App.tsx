import PremierLeague from 'containers/PremierLeague';
import { GameDataProvider } from 'contexts/GameDataContext';

function App() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <GameDataProvider>
        <PremierLeague />
      </GameDataProvider>
    </div>
  );
}

export default App;
